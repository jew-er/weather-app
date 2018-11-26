import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import moment from "moment";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
const URL = getUrl("history"); // for history.json calls
const URL2 = getUrl("current"); // for current.json calls
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({ history: state.history })
});

export default new Vuex.Store({
  state: {
    apidata: {},
    loading: false,
    search: "",
    error: "",
    history: []
  },
  mutations: {
    updateData(state, data) {
      state.apidata = data;
    },
    addDay(state, data) {
      let length = state.apidata.forecast.forecastday.length;
      Vue.set(state.apidata.forecast.forecastday, length, data);
    },
    addCurrent(state, data) {
      //Object.assign({}, state.apidata, { current: data });
      Vue.set(state.apidata, "current", data);
    },
    changeLoadingState(state, loading) {
      state.loading = loading;
    },
    changeSearchQuery(state, searchFor) {
      state.search = searchFor;
    },
    changeError(state, error) {
      state.error = error.toString();
    },
    historyPush(state, query) {
      if (query.length > 0) {
        let currentTime = moment().format("llll");
        state.history.push(query + "--" + currentTime);
      }
    },
    historyShift(state) {
      state.history.shift();
    }
  },
  actions: {
    //there is a problem with this api where doing a forecast.json call doesn't give the hourly object
    //despite the documentation saying it should return it(i tested even on the api website tester).
    //Unfortunately the only way to get hourly information is using history.json which only
    //works on one day at a time, so to get a 48hour forecast i need two api calls, and to get the current time
    // i need to make a current.json call, as a result interacting with this api looks really ugly
    getForecast({ commit, state }, query) {
      let today = moment().format("YYYY -MM-DD");
      let tomorrow = moment()
        .add(1, "days")
        .format("YYYY-MM-DD");

      //get input query and begin loading
      commit("changeSearchQuery", query);
      commit("changeLoadingState", true);

      //get our weather information for today
      axios
        .get(URL + state.search + "&dt=" + today)
        .then(response => {
          commit("updateData", response.data);
          //look up the weather for tomorrow as well
          axios
            .get(URL + state.search + "&dt=" + tomorrow)
            .then(res => {
              commit("addDay", res.data.forecast.forecastday[0]);
              commit("changeLoadingState", false);
              axios
                .get(URL2 + state.search)
                .then(r => {
                  commit("addCurrent", r.data.current);
                  commit("changeLoadingState", false);
                })
                .catch(error => {
                  commit("changeLoadingState", false);
                  commit(
                    "changeError",
                    error + ".Failed to get Current weather"
                  );
                  alert(error + ".Failed to get Current weather");
                });
            })
            .catch(error => {
              commit("changeLoadingState", false);
              commit("changeError", error + ".Failed to get Tomorrows weather");
              alert(error + ".Failed to get Tomorrows weather");
              axios.get(URL2 + state.search).then(rr => {
                commit("addCurrent", rr.data.current);
                commit("changeLoadingState", false);
              });
            });
        })
        .catch(error => {
          commit("changeLoadingState", false);
          commit(
            "changeError",
            error + ".Failed to get hourly forecast for todays weather"
          );
          alert(
            error +
              ".Failed to get hourly forecast for todays weather. Most likely the query has no matches"
          );
        });
    }
  },

  getters: {
    getData(state) {
      return state.apidata;
    },
    getLoadingState(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    },
    getHistory(state) {
      return state.history;
    }
  },
  plugins: [vuexLocal.plugin]
});

function getUrl(callParameter) {
  return `https://api.apixu.com/v1/${callParameter}.json?key=${
    process.env.VUE_APP_KEY
  }&q=`;
}

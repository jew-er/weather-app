<template>
<div class="search">
  <div class="search-form">
  <input v-model="query" placeholder="Enter city name">
  <button v-on:click="sendRequest" :disabled="shouldEnable">
    Search
  </button>
  </div>
  <div class="history" ><p v-on:click="historyRequest(i)" v-for="(i,key) in getHistory" v-bind:key="key">{{i}}</p></div>
</div>
</template>

<script>
export default {
  name: "Search",
  data: function() {
    return {
      query: ""
    };
  },
  methods: {
    sendRequest() {
      if (this.query.length > 0) this.$store.commit("historyPush", this.query);
      if (this.getHistory.length > 5) {
        this.$store.commit("historyShift");
      }
      this.$store.dispatch("getForecast", this.query);
    },
    historyRequest(q) {
      let filterquery = q.substr(0, q.indexOf("--"));
      this.query = filterquery;
      this.$store.dispatch("getForecast", this.query);
    }
  },
  computed: {
    shouldEnable() {
      return !this.query.length > 0;
    },
    getHistory() {
      return this.$store.getters.getHistory;
    }
  }
};
</script>


<style lang="scss" scoped>
.search {
  color: white;
  .history {
    display: flex;
    flex-direction: column;
    p {
      margin: 3px;
      transition: color 0.2 ease-in;
      cursor: pointer;
      &:hover {
        color: crimson;
      }
    }
  }
  .search-form {
    margin: 10px;
    input {
      font-family: "Open Sans", Arial, sans-serif;
      border: none;
      padding: 5px;
      font-size: 1.3em;
      &:focus {
        box-shadow: 0 0 4px springgreen;
      }
    }

    button {
      font-family: "Open Sans", Arial, sans-serif;
      background: rgba(255, 255, 255, 0.8);
      border: none;
      font-size: 1.3em;
      padding: 5px;
      transition: 0.1s ease-in;
      color: black;
      cursor: pointer;
      &:disabled {
        background: gray;
        &:hover {
          background: gray;
          color: black;
        }
      }
      &:hover {
        color: white;
        background: crimson;
      }
    }
  }
}

@media only screen and (max-width: 766px) {
  .search {
    .search-form {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>

<template>
  <div class="app">

    <div v-if="hideIf404" class="nav">
      <Search />
      <router-link to="/"><button>Current</button></router-link>
      <router-link to="/forecast"><button>48h Forecast</button></router-link>
       <div class="loader" v-if="getLoadingState"><trinity-rings-spinner
  :animation-duration="1500"
  :size="66"
  color="#ff1d5e"
/></div>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Search from "@/components/Search.vue";
import { TrinityRingsSpinner } from "epic-spinners";
export default {
  components: {
    Search,
    TrinityRingsSpinner
  },
  computed: {
    ...mapGetters(["getLoadingState"]),
    hideIf404() {
      return !(this.$route.path === "/404");
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Open+Sans:300|Roboto:100");
* {
  padding: 0;
  margin: 0;
}
.app {
  font-family: "Roboto", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: linear-gradient(to bottom, #485563, #29323c);
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.nav {
  padding: 20px;
  a {
    font-weight: bold;
    margin: 4px;
    &.router-link-exact-active button {
      background: crimson;
      color: white;
    }
    button {
      font-family: "Roboto", Arial, sans-serif;
      background: white;
      color: #333;
      border: none;
      padding: 12px;
      font-size: 1.4em;
      transition: 0.2s ease-in;
      &:hover {
        background: crimson;
        color: white;
      }
    }
  }
  .loader {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 66px;
  }
}
</style>

<template>
<div class="search">
  <div class="search-form">
  <input v-model="query" placeholder="Enter city name">
  <button v-on:click="sendRequest" :disabled="shouldEnable">
    Search
  </button>
  </div>
  <div class="history" v-for="(i,key) in history" v-bind:key="key"><p>{{i}}</p></div>
</div>
</template>

<script>
export default {
  name: "Search",
  data: function() {
    return {
      query: "",
      history: []
    };
  },
  methods: {
    sendRequest() {
      this.history.push(this.query);
      if (this.history.length > 5) {
        this.history.shift();
      }
      this.$store.dispatch("getForecast", this.query);
    }
  },
  computed: {
    shouldEnable() {
      return !this.query.length > 0;
    }
  }
};
</script>


<style lang="scss" scoped>
.search {
  color: white;
  .history {
    display: flex;
  }
  .search-form {
    input {
      font-family: "Open Sans", Arial, sans-serif;
    }

    button {
      font-family: "Open Sans", Arial, sans-serif;
    }
  }
}
</style>

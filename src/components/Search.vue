<template>
<div class="search">
  <input v-model="query" placeholder="Enter city name">
  <button v-on:click="sendRequest" :disabled="shouldEnable">
    Search
  </button>
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
      this.$store.dispatch("getForecast", this.query);
      //this.$store.dispatch("getCurrentWeather", this.query);
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
  input {
    font-family: "Open Sans", Arial, sans-serif;
  }

  button {
    font-family: "Open Sans", Arial, sans-serif;
  }
}
</style>

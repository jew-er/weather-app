<template>
  <div v-if="!getLoadingState" class="current">
    <div>
    <span><h2>{{getData.location.country}}</h2><p>{{getData.location.name}}</p></span>
    <img :src="getData.current.condition.icon">
    <p>{{getData.current.condition.text}}</p>
    </div>
    <div>
      <p>Temperature outside is {{getData.current.temp_c + "°C"}}</p>
      <p>Feels like {{getData.current.feelslike_c+ "°C"}}</p>
      <p> Humidity: {{getData.current.humidity +"%"}}</p>
    </div>
      <div>
        <p>Sun UV index: {{getData.current.uv}}</p>
      </div>
    <div>
      <p> Wind moves {{getData.current.wind_dir}} at {{getData.current.wind_kph+"kph"}}</p>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Current",
  computed: {
    ...mapGetters(["getData", "getLoadingState"])
  }
};
</script>


<style lang="scss" scoped>
.current {
  font-family: "Open sans", Arial, sans-serif;
  color: white;
  display: flex;
  flex-direction: column;
  line-height: 2em;
  align-items: center;
  justify-content: center;
}
</style>

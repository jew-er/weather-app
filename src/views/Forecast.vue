<template>
  <div class="forecast">
    <div  class="hour" v-for="(item,key) in hourlyData" v-bind:key="key">
      <img :src="item.condition.icon">
      <p>{{item.time.substring(item.time.length - 5, item.time.length)}}</p>
      <p>{{item.temp_c+"°C"}}</p>
      <div><img src="@/assets/raindrop.png">{{item.chance_of_rain+"%"}}</div>
      <div><img src="@/assets/snowflake.png">{{item.chance_of_snow+"%"}}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Forecast",

  computed: {
    ...mapGetters(["getData", "getLoadingState"]),
    hourlyData() {
      let day1 = this.getData.forecast.forecastday[0].hour;
      let day2 = this.getData.forecast.forecastday[1].hour;
      if (day1.length > 0 && day2.length > 0) {
        let hourlyData = day1.concat(day2);
        let filteredData = [];
        for (let i = 0; i < hourlyData.length; i = i + 3) {
          filteredData.push(hourlyData[i]);
        }

        return filteredData;
      } else return [];
    }
  }
};
</script>

<style lang="scss" scoped>
.forecast {
  font-family: "Open sans", Arial, sans-serif;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  min-width: 300px;
  max-width: 400px;
  .hour {
    border-bottom: 1px solid white;
    padding-bottom: 10px;
    div img {
      transform: translateY(5px);
    }
  }
}
</style>

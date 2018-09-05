import Vue from "vue";
import axios from "axios";

new Vue({
  el: "#app",
  data: {
    currentTemp: "",
    minTemp: "",
    maxTemp: "",
    sunrise: "",
    sunset: "",
    pressure: "",
    humidity: "",
    wind: "",
    overcast: "",
    icon: ""
  },
  methods: {
    getWeather() {
      let url =
        "http://api.openweathermap.org/data/2.5/weather?q=Manila&?units=metric&APPID=47cb686abb391eb2331f952c46913218";
      axios
        .get(url)
        .then(response => {
          this.currentTemp = response.data.main.temp;
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity + "%";
          this.wind = response.data.wind.speed + "m/s";
          this.overcast = response.data.weather[0].description;
          this.icon =
            "images/" + response.data.weather[0].icon.slice(0, 2) + ".svg";
          this.sunrise = new Date(response.data.sys.sunrise * 1000)
            .toLocaleTimeString("en-GB")
            .slice(0, 4);
          this.sunset = new Date(response.data.sys.sunset * 1000)
            .toLocaleTimeString("en-GB")
            .slice(0, 4);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  beforeMount() {
    this.getWeather();
  }
});

<template>
    <div class="container">
      <div class="header">
        <h1>WEATHER APP</h1>
        <div class="search-bar">
          <input
            type="text"
            v-model="city"
            placeholder="Enter city name"
            class="search-input"
          />
          <button @click="searchByCity" class="search-button">Search</button>
        </div>
      </div>
  
      <div v-if="weatherData">
        <p>Total weather records: {{ weatherDataCount }}</p>
      </div>

      <main>

        <div v-if="weatherData">
    
          <h2>
            {{ weatherData.name }}, {{ weatherData.sys.country }}
          </h2>
          <div>
           
            <img :src="iconUrl" alt="Weather Icon" />
            <p>{{ temperature }} °C</p>
          </div>
         
          <span>{{ weatherData.weather[0].description }}</span>
        </div>
      </main>
    </div>
  </template>
  
  <script>
    import axios from "axios";
  
    const apikey = "65aced05895538a8d20f7a365d3984fe"; 
  
    export default {
      name: "WeatherView",
      data() {
        return {
          city: "",
          weatherData: null,
          hourlyForecast: [],
          dailyForecast: [],
        };
      },
      computed: {
 
        temperature() {
          return this.weatherData
            ? Math.floor(this.weatherData.main.temp - 273)
            : null;
        },
   
        iconUrl() {
          return this.weatherData
            ? `http://api.openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
            : null;
        },
 
        weatherDataCount() {
       
          return this.weatherData ? 1 : 0; 
        }
      },
      mounted() {
        this.fetchCurrentLocationWeather();
      },
      methods: {
        async fetchCurrentLocationWeather() {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async (position) => {
              const { latitude, longitude } = position.coords;
              const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
              await this.fetchWeatherData(url);
            });
          }
        },
   
        async fetchWeatherData(url) {
          try {
            const response = await axios.get(url);
            this.weatherData = response.data;
          } catch (error) {
            console.error("获取天气数据时出错:", error);
          }
        },
      
        async searchByCity() {
          if (this.city) {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apikey}`;
            await this.fetchWeatherData(url);
          }
        },
      },
    };
  </script>
  
  <style>

  .container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }
  
  .header {
    margin-bottom: 20px;
  }
  
  .search-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .search-input {
    padding: 10px;
    font-size: 16px;
    width: 200px;
  }
  
  .search-button {
    padding: 10px;
    font-size: 16px;
    margin-left: 10px;
    cursor: pointer;
  }
  
  main {
    padding: 20px;
  }
  </style>
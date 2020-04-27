import { EventEmitter } from "events";
import dispatcher from "./dispatcher";
import axios from "axios";

class DataStore extends EventEmitter {
  constructor() {
    super();
    this.selectedCountry = "USA";
    this.countriesData = {};
    this.histData = [];
    this.coordinates = [0, 0];
  }

  changeCountry(selectedCountry) {
    this.selectedCountry = selectedCountry;
    this.fetchHistoricalData(this.selectedCountry);
    this.updateCoordinates();
    this.emit("change");
  }

  fetchCountriesData() {
    let countriesData = {};
    axios
      .get("https://corona.lmao.ninja/v2/countries")
      .then((res) => {
        res.data.forEach((elem) => {
          const name = elem.country;
          countriesData[name] = elem;
        });
      })
      .then(() => {
        this.countriesData = countriesData;
        this.updateCoordinates();
        this.emit("change");
      });
  }

  fetchHistoricalData(country) {
    let histData = [];
    if (country) {
      axios
        .get(`https://corona.lmao.ninja/v2/historical/${country}`)
        .then((res) => {
          const { cases, deaths, recovered } = res.data.timeline;
          for (let [date, c] of Object.entries(cases)) {
            const d = deaths[date];
            const r = recovered[date];
            histData.push({ date, cases: c, deaths: d, recovered: r });
          }
        })
        .then(() => {
          this.histData = histData;
          this.emit("change");
        });
    }
  }
  updateCoordinates() {
    const lat = this.countriesData[this.selectedCountry].countryInfo.long;
    const long = this.countriesData[this.selectedCountry].countryInfo.lat;

    this.coordinates = [lat, long];
  }

  getSelectedCountry() {
    return this.selectedCountry;
  }

  getCountriesData() {
    return this.countriesData;
  }

  getHistoricalData() {
    return this.histData;
  }

  getCoordinates() {
    return this.coordinates;
  }

  handleActions(action) {
    switch (action.type) {
      case "CHANGE_COUNTRY": {
        this.changeCountry(action.selectedCountry);
      }
      case "GET_COUNTRIES_DATA": {
        this.fetchCountriesData();
      }
      case "GET_HISTORICAL_DATA": {
        this.fetchHistoricalData(action.country);
      }
    }
  }
}

const dataStore = new DataStore();
dispatcher.register(dataStore.handleActions.bind(dataStore));
export default dataStore;

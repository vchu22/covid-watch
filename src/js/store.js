import { EventEmitter } from 'events';
import dispatcher from './dispatcher';
import axios from 'axios';

class DataStore extends EventEmitter {
  constructor() {
    super();
    this.selectedCountry = 'USA';
    this.countriesData = {};
    this.histData = [];

    this.fetchHistoricalData = this.fetchHistoricalData.bind(this);
  }

  changeCountry(selectedCountry) {
    this.selectedCountry = selectedCountry;
    this.fetchHistoricalData(this.selectedCountry);
    this.emit('change');
  }

  fetchCountriesData() {
    let countriesData = {};
    axios
      .get('https://corona.lmao.ninja/v2/countries')
      .then((res) => {
        res.data.forEach((elem) => {
          const name = elem.country;
          countriesData[name] = elem;
        });
      })
      .then(() => {
        this.countriesData = countriesData;
        this.emit('change');
      });
  }

  fetchHistoricalData(country) {
    let histData = [];
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
        this.emit('change');
      });
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

  handleActions(action) {
    switch (action.type) {
      case 'CHANGE_COUNTRY': {
        this.changeCountry(action.selectedCountry);
      }
      case 'GET_COUNTRIES_DATA': {
        this.fetchCountriesData();
      }
      case 'GET_HISTORICAL_DATA': {
        this.fetchHistoricalData(action.country);
      }
      default:
        return state;
    }
  }
}

const dataStore = new DataStore();
dispatcher.register(dataStore.handleActions.bind(dataStore));
window.dispatcher = dispatcher;
export default dataStore;

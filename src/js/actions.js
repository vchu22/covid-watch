import dispatcher from './dispatcher';

export function changeCountry(selectedCountry) {
  dispatcher.dispatch({
    type: 'CHANGE_COUNTRY',
    selectedCountry,
  });
}

export function fetchCountriesData() {
  dispatcher.dispatch({
    type: 'GET_COUNTRIES_DATA',
  });
}

export function fetchHistoricalData(country) {
  dispatcher.dispatch({
    type: 'GET_HISTORICAL_DATA',
    country,
  });
}

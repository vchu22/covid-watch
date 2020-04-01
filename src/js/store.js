import { createStore, applyMiddleware} from 'redux';
import axios from 'axios';
import loggingMiddleware from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const initialState = {
    selectedCountry: 'USA',
    countriesData: {}
}

const CHANGED_COUNTRY = 'CHANGED_COUNTRY';
const changedCountry = () => {type: CHANGED_COUNTRY};

const GOT_COUNTRIES_DATA = 'GOT_COUNTRIES_DATA';
const gotCountriesData = () => {type: GOT_COUNTRIES_DATA};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGED_COUNTRY:
            return { ...state, selectedCountry: state.selectedCountry}
        case GOT_COUNTRIES_DATA:
            return { ...state, countriesData: state.countriesData }
        default:
            return state
    }
}

const middlewares = applyMiddleware(loggingMiddleware, thunkMiddleware);
const store = createStore(reducer, middlewares);

// thunk creators
export const changeCountry = (country) => {
    return dispatch => {
        dispatch(changedCountry(country))
    }
}
export const getCountriesData = () => {
    return async dispatch => {
        const rawData = await axios.get('/https://corona.lmao.ninja/countries');
        let countriesData = {};
        rawData.forEach(elem => {
            const name = elem.country;
            countriesData[name] = elem;
        });
        dispatch(gotCountriesData(countriesData));
    };
}

export default store;
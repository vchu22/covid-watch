import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import Display from './Display';

const Header = styled.h2`
  font-size: 3em;
  text-align: center;
  font-family: 'Exo', sans-serif;
`;
const CountrySelection = styled.select`
  text-align: center;
  display: block;
  margin: 0 auto;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      countriesData: {},
      selectedCountry: 'USA',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const selectedCountry = e.target.value;
    this.setState({ selectedCountry });
  }
  componentDidMount() {
    axios.get(`https://corona.lmao.ninja/countries`).then(res => {
      const rawData = res.data;
      let countriesData = {};
      rawData.forEach(elem => {
        const name = elem.country;
        countriesData[name] = elem;
      });
      this.setState({ countriesData });
    });
  }
  render() {
    let { countriesData, selectedCountry } = this.state;
    let countries = Object.keys(countriesData).sort();
    return (
      <div>
        <Header>Data Visualization for COVID-19 Trend</Header>
        <CountrySelection
          value={this.state.selectedCountry}
          onChange={this.handleChange}
        >
          {countries.map((country, idx) => (
            <option key={idx} value={country}>
              {country}
            </option>
          ))}
        </CountrySelection>
        {countries.length !== 0 ? (
          <Display details={countriesData[selectedCountry]} />
        ) : null}
      </div>
    );
  }
}

export default App;

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<App />, wrapper) : false;

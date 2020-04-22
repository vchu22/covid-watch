import React, { Component } from 'react';
import styled from 'styled-components';
import DataStore from '../store';
import { fetchCountriesData, changeCountry } from '../actions';

const DropDownMenu = styled.select`
  text-align: center;
  display: block;
  margin: 0 auto;
  padding: 10px;
  font-family: 'PT Sans', sans-serif;
  font-size: 16px;
  box-shadow: 1px 1px 8px #555555;
  border: 0;
  border-radius: 0.2em;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
    linear-gradient(to bottom, #f0f0f0 0%, #e0e0e0 100%);
  background-repeat: no-repeat, repeat;
  background-position: right 0.7em top 50%, 0 0;
  background-size: 0.65em auto, 100%;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
`;

class CountrySelection extends Component {
  constructor() {
    super();
    this.state = {
      selectedCountry: DataStore.getSelectedCountry(),
      countriesData: DataStore.getCountriesData(),
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const selectedCountry = e.target.value;
    changeCountry(selectedCountry);
    DataStore.on('change', () => {
      this.setState({
        selectedCountry: DataStore.getSelectedCountry(),
      });
    });
  }
  componentDidMount() {
    fetchCountriesData();
    DataStore.on('change', () => {
      this.setState({
        selectedCountry: DataStore.getSelectedCountry(),
        countriesData: DataStore.getCountriesData(),
      });
    });
  }
  render() {
    let countries = this.state.countriesData
      ? Object.keys(this.state.countriesData).sort()
      : [];
    return (
      <DropDownMenu
        value={this.state.selectedCountry}
        onChange={this.handleChange}
      >
        {countries.map((country, idx) => (
          <option key={idx} value={country}>
            {country}
          </option>
        ))}
      </DropDownMenu>
    );
  }
}

export default CountrySelection;

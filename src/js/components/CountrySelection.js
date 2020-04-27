import React, { Component } from "react";
import DataStore from "../store";
import { fetchCountriesData, changeCountry } from "../actions";
import DropDownMenu from "./Styled/DropDownMenu";

class CountrySelection extends Component {
  constructor() {
    super();
    this.state = {
      selectedCountry: DataStore.getSelectedCountry(),
      countriesData: DataStore.getCountriesData(),
    };
    this.handleChange = this.handleChange.bind(this);
    fetchCountriesData();
  }
  handleChange(e) {
    const selectedCountry = e.target.value;
    changeCountry(selectedCountry);
    DataStore.on("change", () => {
      this.setState({
        selectedCountry: DataStore.getSelectedCountry(),
      });
    });
  }
  componentDidMount() {
    DataStore.on("change", () => {
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

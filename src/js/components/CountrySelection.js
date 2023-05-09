import React, { useState, useEffect } from "react";
import DataStore from "../store";
import { changeCountry } from "../actions";
import DropDownMenu from "./Styled/DropDownMenu";

const CountrySelection = () => {
  const [selectedCountry, setSelectedCountry] = useState(
    DataStore.getSelectedCountry()
  );
  const [countriesData, setCountriesData] = useState(
    DataStore.getCountriesData()
  );

  const handleChange = (e) => {
    const selectedCountry = e.target.value;
    changeCountry(selectedCountry);
    DataStore.on("change", () => {
      setSelectedCountry(DataStore.getSelectedCountry());
    });
  };

  useEffect(() => {
    DataStore.on("change", () => {
      setSelectedCountry(DataStore.getSelectedCountry());
      setCountriesData(DataStore.getCountriesData());
    });
  }, []);

  let countries = countriesData ? Object.keys(countriesData).sort() : [];
  return (
    <DropDownMenu value={selectedCountry} onChange={handleChange}>
      {countries.map((country, idx) => (
        <option key={idx} value={country}>
          {country}
        </option>
      ))}
    </DropDownMenu>
  );
};

export default CountrySelection;

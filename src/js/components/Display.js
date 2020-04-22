import React, { Component } from 'react';
import DataStore from '../store';
import { fetchHistoricalData } from '../actions';
import styled from 'styled-components';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Card from './Card';

const DataDisplay = styled.div`
  font-size: 1.5em;
  text-align: center;
  background-color: WhiteSmoke;
  margin: 50px 10vw;
  padding: 10px;
  box-shadow: 1px 1px 8px #555555;
  font-family: 'PT Sans', sans-serif;
`;
const CountryDiv = styled.div`
  margin: 20px;
  font-size: 38px;
  font-family: 'Raleway', sans-serif;
  & > img {
    width: 40px;
    height: 32px;
    margin: 0 10px;
  }
`;

// Component
class Display extends Component {
  constructor() {
    super();
    this.state = {
      selectedCountry: DataStore.getSelectedCountry(),
      countriesData: DataStore.getCountriesData(),
      histData: DataStore.getHistoricalData(),
    };
  }

  componentDidMount() {
    fetchHistoricalData(this.state.selectedCountry);
    DataStore.on('change', () => {
      this.setState({
        selectedCountry: DataStore.getSelectedCountry(),
        countriesData: DataStore.getCountriesData(),
        histData: DataStore.getHistoricalData(),
      });
    });
  }

  render() {
    const selectedCountry = this.state.selectedCountry;
    const countriesData = this.state.countriesData;
    const details = countriesData ? countriesData[selectedCountry] : {};
    window.state = this.state;
    const {
      country,
      cases,
      deaths,
      deathsPerOneMillion,
      critical,
      recovered,
      active,
      countryInfo,
    } = details || {};

    return details ? (
      <DataDisplay>
        <CountryDiv>
          <img src={countryInfo.flag} /> {country}{' '}
        </CountryDiv>

        <Card title="Total cases" number={cases} color="#ff6600"></Card>
        <Card title="Deaths" number={deaths} color="#e60000"></Card>
        {deathsPerOneMillion ? (
          <Card
            title="Deaths per Million"
            number={deathsPerOneMillion}
            color="#ff0066"
          ></Card>
        ) : null}
        <Card title="Critical" number={critical} color="#6600cc"></Card>
        <Card title="Recovery" number={recovered} color="#33cc33"></Card>
        <Card title="Active" number={active} color="#0099ff"></Card>
        <h4>Historical Data</h4>
        <ResponsiveContainer width="100%" height={500}>
          <AreaChart
            data={this.state.histData}
            margin={{
              top: 5,
              right: 30,
              left: 50,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" hide={true} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="cases"
              stroke="#6A5ACD"
              fill="#6A5ACD"
              activeDot={{ r: 10 }}
            />
            <Area
              type="monotone"
              dataKey="recovered"
              stroke="#00e600"
              fill="#00e600"
              activeDot={{ r: 8 }}
            />
            <Area
              type="monotone"
              dataKey="deaths"
              stroke="#FF3300"
              fill="#FF3300"
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </DataDisplay>
    ) : null;
  }
}

export default Display;

import React, { Component } from 'react';
import axios from 'axios';
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
      histData: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://corona.lmao.ninja/v2/historical/${this.props.details.country}`
      )
      .then((res) => {
        const { cases, deaths, recovered } = res.data.timeline;
        let histData = [];
        for (let [date, c] of Object.entries(cases)) {
          const d = deaths[date];
          const r = recovered[date];
          histData.push({ date, cases: c, deaths: d, recovered: r });
        }
        this.setState({
          histData,
        });
      });
  }

  render() {
    const {
      country,
      cases,
      deaths,
      deathsPerOneMillion,
      critical,
      recovered,
      active,
    } = this.props.details;
    const { flag } = this.props.details.countryInfo;

    return (
      <DataDisplay>
        <CountryDiv>
          <img src={flag} /> {country}{' '}
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
    );
  }
}

export default Display;

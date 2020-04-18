import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  LineChart,
  Line,
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
  font-family: 'PT Sans', sans-serif;
`;
const Img = styled.img`
  width: 26px;
  height: 20px;
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
    console.log(this.props.details.country);
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
        <div>
          <Img src={flag} /> {country}{' '}
        </div>
        <Card title="Total cases" number={cases} color="#ff6600"></Card>
        <Card title="Deaths" number={deaths} color="#e60000"></Card>
        {deathsPerOneMillion ? (
          <Card
            title="Deaths per Million: "
            number={deathsPerOneMillion}
            color="#ff0066"
          ></Card>
        ) : null}
        <Card title="Critical" number={critical} color="#6600cc"></Card>
        <Card title="Recovery" number={recovered} color="#33cc33"></Card>
        <Card title="Active" number={active} color="#0099ff"></Card>
        <h4>Historical Data</h4>
        <LineChart
          width={1000}
          height={500}
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
          <Line
            type="monotone"
            dataKey="cases"
            stroke="#6A5ACD"
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="deaths"
            stroke="#191970"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="recovered"
            stroke="#3CB371"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </DataDisplay>
    );
  }
}

export default Display;

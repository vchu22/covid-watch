import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

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

const format = number =>
  number.toLocaleString(navigator.language, {
    minimumFractionDigits: 0,
  });

// Component
class Display extends Component {
  constructor() {
    super();
    this.state = {
      histCases: [],
      histDeaths: [],
      histRecovered: [],
    };
  }

  componentDidMount() {
    // console.log(this.props.details.country);
    axios
      .get(
        `https://corona.lmao.ninja/v2/historical/${this.props.details.country}`
      )
      .then(res => {
        const { cases, deaths, recovered } = res.data.timeline;
        let c = [],
          d = [],
          r = [];
        for (let [key, value] of Object.entries(cases)) {
          c.push({ date: key, number: value });
        }
        for (let [key, value] of Object.entries(deaths)) {
          d.push({ date: key, number: value });
        }
        for (let [key, value] of Object.entries(recovered)) {
          r.push({ date: key, number: value });
        }
        this.setState({
          histCases: c,
          histDeaths: d,
          histRecovered: r,
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
        <div>Total cases: {format(cases)}</div>
        <div>Deaths: {format(deaths)}</div>
        <div>
          {deathsPerOneMillion
            ? 'Deaths per Million: ' + format(deathsPerOneMillion)
            : null}
        </div>
        <div>Critical: {format(critical)}</div>
        <div>Recovery: {format(recovered)}</div>
        <div>Active: {format(active)}</div>
      </DataDisplay>
    );
  }
}

export default Display;

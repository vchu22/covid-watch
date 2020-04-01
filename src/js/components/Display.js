import React from 'react';
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

const Display = ({ details }) => {
  const {
    country,
    cases,
    deaths,
    deathsPerOneMillion,
    critical,
    recovered,
    active,
  } = details;
  const { flag } = details.countryInfo;

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
};

export default Display;

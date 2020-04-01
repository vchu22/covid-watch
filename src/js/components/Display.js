import React from 'react';
import styled from 'styled-components';

const DataDisplay = styled.div`
  font-size: 1.5em;
  text-align: center;
  background-color: WhiteSmoke;
  margin: 50px 10vw;
  font-family: 'PT Sans', sans-serif;
`;

const format = number =>
  number.toLocaleString(navigator.language, {
    minimumFractionDigits: 0,
  });

const Display = ({ details }) => {
  let {
    country,
    cases,
    deaths,
    deathsPerOneMillion,
    recovered,
    active,
  } = details;
  console.log(details);
  return (
    <DataDisplay>
      <div>Country: {country} </div>
      <div>Total cases: {format(cases)}</div>
      <div>Deaths: {format(deaths)}</div>
      <div>
        {deathsPerOneMillion
          ? 'Deaths per Million: ' + format(deathsPerOneMillion)
          : null}
      </div>
      <div>Recovery: {format(recovered)}</div>
      <div>Active: {format(active)}</div>
    </DataDisplay>
  );
};

export default Display;

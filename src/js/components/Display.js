import React from 'react';

const Display = ({ details }) => {
  console.log(details);
  let {
    country,
    cases,
    deaths,
    deathsPerOneMillion,
    recovered,
    active,
  } = details;
  return (
    <div className="data-display">
      <div>Country: {country} </div>
      <div>Total cases: {cases}</div>
      <div>Deaths: {deaths}</div>
      <div>Deaths per Million: {deathsPerOneMillion}</div>
      <div>Recovery: {recovered}</div>
      <div>Active: {active}</div>
    </div>
  );
};

export default Display;

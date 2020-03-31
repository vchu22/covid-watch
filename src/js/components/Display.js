import React from 'react';

const Display = () => {
  let country = 'All';
  return (
    <div className="data-display">
      <div>Country: {country} </div>
      <div>Total cases: </div>
      <div>Deaths: </div>
      <div>Recovery: </div>
      <div>Active: </div>
    </div>
  );
};

export default Display;

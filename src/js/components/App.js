import React from 'react';
import ReactDOM from 'react-dom';
import Display from './Display';

const App = () => {
  return (
    <div>
      <h2>Data Visualization for COVID-19 Trend</h2>
      <p>Please the country you would like get data on:</p>
      <input type="text" name="country" />{' '}
      <input type="submit" value="Submit" />
      <Display />
    </div>
  );
};

export default App;

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<App />, wrapper) : false;

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Display from './Display';

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
    };
  }
  componentDidMount() {
    axios.get(`https://corona.lmao.ninja/countries`).then(res => {
      const countries = res.data;
      this.setState({ countries });
    });
  }
  render() {
    return (
      <div>
        <h2>Data Visualization for COVID-19 Trend</h2>
        {/* <p>Please the country you would like get data on:</p> */}
        {this.state.countries.map(details => {
          return <Display details={details} />;
        })}
      </div>
    );
  }
}

export default App;

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<App />, wrapper) : false;

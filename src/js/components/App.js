import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import Display from './Display';

const Header = styled.h2`
  font-size: 3em;
  text-align: center;
  font-family: 'Exo', sans-serif;
  // color: DarkSlateGray;
`;

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
        <Header>Data Visualization for COVID-19 Trend</Header>
        {/* <p>Please the country you would like get data on:</p> */}
        {this.state.countries.map((details, idx) => {
          return <Display key={idx} details={details} />;
        })}
      </div>
    );
  }
}

export default App;

const wrapper = document.getElementById('container');
wrapper ? ReactDOM.render(<App />, wrapper) : false;

import React, { Component } from 'react';
import styled from 'styled-components';
import Display from './Display';
import CountrySelection from './CountrySelection';

const Header = styled.h2`
  font-size: 3em;
  text-align: center;
  font-family: 'Exo', sans-serif;
  color: #f0f0f0;
  text-shadow: 2px 2px 5px #555;
`;

class App extends Component {
  render() {
    return (
      <div>
        <Header>COVID Watch</Header>
        <CountrySelection />
        <Display />
      </div>
    );
  }
}

export default App;

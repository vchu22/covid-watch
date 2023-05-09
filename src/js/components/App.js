import React from "react";
import Header from "./Styled/Header";
import Display from "./Display";
import CountrySelection from "./CountrySelection";

const App = () => {
  return (
    <div>
      <Header>COVID Watch</Header>
      <CountrySelection />
      <Display />
    </div>
  );
};

export default App;

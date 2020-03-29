import React, { Component } from "react";
import ReactDOM from "react-dom";

const App = () => {
    return (
        <div>
            Hello React!
        </div>
    )
};

export default App;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
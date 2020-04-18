import React, { Component } from 'react';
import styled from 'styled-components';

const CardDiv = styled.div`
  background-color: #fff;
  display: inline-block;
  padding: 5px 20px;
  margin: 20px;
`;

const format = (number) =>
  number.toLocaleString(navigator.language, {
    minimumFractionDigits: 0,
  });

const Card = ({ title, number, color }) => {
  return (
    <CardDiv>
      <h3>{title}</h3>
      <p style={{ color: color }}>{format(number)}</p>
    </CardDiv>
  );
};

export default Card;

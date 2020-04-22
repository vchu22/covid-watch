import React from 'react';
import styled from 'styled-components';

const CardDiv = styled.div`
  background-color: #fff;
  display: inline-block;
  padding: 5px 30px;
  margin: 20px;
  box-shadow: 1px 1px 8px #aaaaaa;
  cursor: default;
  &:hover {
    background-color: #f4f4f4;
  }
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

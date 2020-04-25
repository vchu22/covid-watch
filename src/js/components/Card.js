import React from 'react';
import styled from 'styled-components';
import CountUp from 'react-countup';

const CardDiv = styled.div`
  background-color: #fff;
  display: inline-block;
  padding: 0 30px 30px;
  margin: 15px;
  box-shadow: 1px 1px 8px #aaaaaa;
  cursor: default;
  &:hover {
    background-color: #f4f4f4;
  }
`;

const Card = ({ title, number, color }) => {
  return (
    <CardDiv>
      <h3>{title}</h3>
      <CountUp
        style={{
          color,
        }}
        start={0}
        end={number}
        duration={2.5}
        separator=","
      ></CountUp>
    </CardDiv>
  );
};

export default Card;

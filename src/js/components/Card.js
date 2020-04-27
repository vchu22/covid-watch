import React from "react";
import CountUp from "react-countup";
import CardDiv from "./Styled/CardDiv";

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

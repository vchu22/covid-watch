import styled from "styled-components";

const DataDisplay = styled.div`
  font-size: 1.5em;
  text-align: center;
  background-color: WhiteSmoke;
  margin: 50px 10vw;
  padding: 10px;
  box-shadow: 1px 1px 8px #555555;
  font-family: "PT Sans", sans-serif;
  @media only screen and (max-width: 1040px) and (min-width: 721px) {
    margin: 50px 5vw;
  }
  @media only screen and (max-width: 720px) {
    margin: 50px 10px;
  }
`;

export default DataDisplay;

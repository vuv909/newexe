import React from "react";
import styled from "styled-components";
import Middle from "./Middle";

const Container = styled.div`
  
  margin-top: 70px;
  display: flex;
  z-index: -1;
`;
const Body = () => {
  return (
    <Container>
      
      <Middle />
     
    </Container>
  );
};

export default Body;

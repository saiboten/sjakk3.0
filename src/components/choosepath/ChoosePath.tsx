import React from "react";
import styled from "styled-components";
import { StyledContainer } from "../styled/StyledContainer";
import { NavLink } from "react-router";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 400px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const StyledHeader = styled.h1`
  flex: 1;
`;

class ChoosePath extends React.Component {
  render() {
    return (
      <StyledContainer>
        <StyledWrapper>
          <StyledHeader>Sjakk og Whiskey-klubben</StyledHeader>
          <NavLink className="smallspace button" to="/">
            Oversikt
          </NavLink>
        </StyledWrapper>
      </StyledContainer>
    );
  }
}

export default ChoosePath;

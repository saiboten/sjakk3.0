import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledContainer } from "../styled/StyledContainer";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 400px) {
    flex-direction: row;
    justify-content: flex-end;
  }
`;

const StyledLink = styled(Link)`
  padding: 5px;
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
          <Link className="smallspace button" to="/">
            Oversikt
          </Link>
        </StyledWrapper>
      </StyledContainer>
    );
  }
}

export default ChoosePath;

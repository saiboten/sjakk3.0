import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { StyledContainer } from "../styled/StyledContainer";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  padding: 5px;
`;

class ChoosePath extends React.Component {
  render() {
    return (
      <StyledContainer>
        <StyledWrapper>
          <Link className="smallspace button" to="/users">
            Brukere
          </Link>
          <Link className="smallspace button" to="/tournaments">
            Turneringer
          </Link>
        </StyledWrapper>
      </StyledContainer>
    );
  }
}

export default ChoosePath;

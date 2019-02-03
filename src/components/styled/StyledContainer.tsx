import styled from "styled-components";

export const StyledContainer = styled.div`
  max-width: 800px;
  margin: 10px auto;
  border: 1px solid black;
  padding: 10px;
  border-radius: 5px;
  background-color: white;

  @media (max-width: 400px) {
    max-width: 100%;
    margin: 0 auto;
  }
`;

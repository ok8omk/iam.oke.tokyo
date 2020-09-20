import { FC } from "react";
import styled from "@emotion/styled";
import { DARK_COLOR } from "../../Colors";

const Container = styled.header`
  width: 100%;
  font-size: 1rem;
  padding: 1em;
  > a {
    color: ${DARK_COLOR};
    text-decoration: none;
    font-weight: bold;
  }
`;

export const Header: FC = () => {
  return (
    <Container>
      <a href="/">iam.oke.tokyo</a>
    </Container>
  );
};

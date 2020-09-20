import { FC } from "react";
import styled from "@emotion/styled";
import { THEME_COLOR } from "../../Colors";

const Container = styled.footer`
  font-size: 1rem;
  width: 100%;
  padding: 1em;
  background: ${THEME_COLOR};
  color: white;
  text-align: center;
`;

export const Footer: FC = () => (
  <Container>This site uses Google Analytics.</Container>
);

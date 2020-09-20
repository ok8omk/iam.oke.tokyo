import styled from "@emotion/styled";
import { DARK_COLOR, LIGHT_DARK_COLOR } from "../../../Colors";

const includeHeaderHash = (level: number) => `
  ::before {
    display: inline-block;
    content: "${"#".repeat(level)}";
    color: ${DARK_COLOR};
    margin-right: 4px;
  }
`;

export const PostContent = styled.article`
  margin-top: 32px;
  font-size: 1rem;
  line-height: 1.5;
  > h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 1.2rem;
    vertical-align: middle;
    border-bottom: solid 1px ${LIGHT_DARK_COLOR};
  }
  > h2 {
    ${includeHeaderHash(1)}
  }
  > h3 {
    ${includeHeaderHash(2)}
  }
  > h4 {
    ${includeHeaderHash(3)}
  }
  > h5 {
    ${includeHeaderHash(4)}
  }
  > h6 {
    ${includeHeaderHash(5)}
  }
  > blockquote {
    padding-left: 4px;
    ::before {
      content: "";
      border-left: solid 4px ${DARK_COLOR};
      margin-right: 8px;
    }
  }
  > ol,
  > ul {
    padding-left: calc(1em + 8px);
  }
`;

import { FC } from "react";
import styled from "@emotion/styled";
import { LIGHT_DARK_COLOR } from "../../Colors";

type Props = {
  id: string;
  title: string;
  publishedAt: string;
  description: string;
};

const Container = styled.div`
  width: 100%;
  border: solid 1px ${LIGHT_DARK_COLOR};
  border-radius: 4px;
  padding: 8px;
`;

const Title = styled.div`
  margin-bottom: 4px;
`;

const Description = styled.div`
  font-size: 0.8rem;
`;

export const PostListingItem: FC<Props> = ({
  id,
  title,
  publishedAt,
  description,
}) => (
  <Container>
    <Title>
      <a href={`/posts/${id}`}>{title}</a>
    </Title>
    <Description>
      {publishedAt}・{description}
    </Description>
  </Container>
);

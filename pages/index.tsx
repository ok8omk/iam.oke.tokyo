import { FC } from "react";
import { Post, getPosts } from "../lib/post";
import { GetStaticProps } from "next";

type Props = {
  posts: Post[];
};

const Index: FC<Props> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <div>{post.title}</div>
          <div>{post.content}</div>
          <div>{post.createdAt}</div>
        </div>
      ))}
    </div>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  return {
    props: { posts },
  };
};

export default Index;
export { getStaticProps };

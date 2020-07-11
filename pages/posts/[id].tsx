import { FC } from "react";
import { Post, getPost, getPostIds } from "../../lib/post";
import { GetStaticPaths, GetStaticProps } from "next";

type Props = {
  post: Post;
};

const View: FC<Props> = ({ post }) => {
  return (
    <div key={post.id}>
      <div>{post.title}</div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <div>{post.createdAt}</div>
    </div>
  );
};

const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPostIds();

  return {
    paths,
    fallback: false,
  };
};

const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPost(params.id as string);

  return {
    props: { post },
  };
};

export default View;
export { getStaticPaths, getStaticProps };

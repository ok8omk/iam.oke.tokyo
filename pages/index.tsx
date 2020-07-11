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
        <div>
          <a href={`/posts/${post.id}`}>{post.title}</a>
          <div key={post.id}>
            {formatDate(post.createdAt)}・
            {post.content.replace(/<[a-z]+>/g, "").replace(/<\/[a-z]+>/g, "")}
          </div>
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
};

export default Index;
export { getStaticProps };

import { FC } from "react";
import Head from "next/head";
import { Post, PostProps } from "../lib/post";
import { GetStaticProps } from "next";
import OgpMetaTags from "../components/OgpMetaTags";
import { MainContainer } from "../components/styled";
import { PostListingLayout, PostListingItem } from "../components/pages/index";

type Props = {
  posts: PostProps[];
};

const Index: FC<Props> = ({ posts }) => {
  return (
    <MainContainer>
      <Head>
        <title>iam.oke.tokyo</title>
        <OgpMetaTags
          urlPath="/"
          title="iam.oke.tokyo"
          description="2年目ITエンジニアの無益なブログ。雨の降る日は天気が悪いというような当たり前なことばかり書いている。"
        />
      </Head>
      <PostListingLayout>
        {posts.map((post) => {
          return (
            <PostListingItem
              key={post.id}
              id={post.id}
              title={post.title}
              publishedAt={post.publishedAt}
              description={post.description}
            />
          );
        })}
      </PostListingLayout>
    </MainContainer>
  );
};

const getStaticProps: GetStaticProps = async () => {
  const posts = await Post.getPosts();
  const props = posts.map((post) => post.toProps());

  return {
    props: { posts: props },
  };
};
export default Index;
export { getStaticProps };

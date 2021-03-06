import { FC } from "react";
import Head from "next/head";
import { Post, PostProps } from "../../lib/post";
import { GetServerSideProps } from "next";
import {
  PostListingLayout,
  PostListingItem,
} from "../../components/pages/index";
import { SearchResult } from "../../components/pages/posts/search";
import { MainContainer, OgpMetaTags } from "../../components/shared";

type Props = {
  posts: PostProps[];
  queryWord: string;
};

const View: FC<Props> = ({ posts, queryWord }) => {
  return (
    <MainContainer>
      <Head>
        <title>iam.oke.tokyo</title>
        <OgpMetaTags
          urlPath="/"
          title={`「${queryWord}」の検索結果 | iam.oke.tokyo`}
          description={`${posts.length}件の投稿`}
        />
      </Head>
      <SearchResult>
        「{queryWord}」の検索結果：
        {posts.length > 0
          ? `${posts.length}件の投稿が見つかりました。`
          : `投稿は見つかりませんでした。`}
      </SearchResult>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const word = context.query.word as string;
  const posts = await Post.getPosts({ word });
  const postProps = posts.map((post) => post.toProps());

  return {
    props: { posts: postProps, queryWord: word },
  };
};

export default View;

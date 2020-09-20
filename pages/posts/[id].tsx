import { FC } from "react";
import { Post, PostProps } from "../../lib/post";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import ErrorPage from "next/error";
import {
  PostTitle,
  PostContent,
  PostMetaData,
} from "../../components/pages/posts/id";
import { MainContainer, Divider, OgpMetaTags } from "../../components/shared";

type Props = {
  post: PostProps;
};

const MICROCMS_ASSET_DOMAIN = "images.microcms-assets.io" as const;

const View: FC<Props> = ({ post }) => {
  if (!post) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <MainContainer>
      <Head>
        <title>{post.title} | iam.oke.tokyo</title>
        <OgpMetaTags
          urlPath={`/posts/${post.id}`}
          title={`${post.title} | iam.oke.tokyo`}
          description={post.description}
        />
      </Head>
      <PostTitle>{post.title}</PostTitle>
      <PostMetaData>
        投稿日:{post.publishedAt} / 最終更新日:
        {post.updatedAt}
      </PostMetaData>
      <Divider />
      <PostContent>{ReactHtmlParser(post.content, { transform })}</PostContent>
    </MainContainer>
  );
};

const transform = (node, index) => {
  if (node.type === "tag" && node.name === "h1") {
    node.name = "h2";
    return convertNodeToElement(node, index, transform);
  }
  if (node.type === "tag" && node.name === "h2") {
    node.name = "h3";
    return convertNodeToElement(node, index, transform);
  }
  if (node.type === "tag" && node.name === "h3") {
    node.name = "h4";
    return convertNodeToElement(node, index, transform);
  }
  if (node.type === "tag" && node.name === "h4") {
    node.name = "h5";
    return convertNodeToElement(node, index, transform);
  }
  if (node.type === "tag" && node.name === "h5") {
    node.name = "h6";
    return convertNodeToElement(node, index, transform);
  }
  if (node.type === "tag" && node.name === "img") {
    const src = node.attribs.src;
    if (!src.includes(MICROCMS_ASSET_DOMAIN)) {
      return node;
    }
    return (
      <picture key={src}>
        <source type="image/webp" srcSet={`${src}?fm=webp&w=1280`} />
        <img
          src={src}
          srcSet={`${src}?w=1280 1x, ${src}?w=1280&dpr=2 2x`}
          alt="記事中画像"
        />
      </picture>
    );
  }
};

const getStaticPaths: GetStaticPaths = async () => {
  const posts = await Post.getPosts();
  const paths = posts.map((post) => {
    return { params: { id: post.id } };
  });

  return {
    paths,
    fallback: true,
  };
};

const getStaticProps: GetStaticProps = async ({
  params,
  preview,
  previewData,
}) => {
  const post = preview
    ? await Post.getPreviewPost(
        params.id as string,
        previewData.draftKey as string
      )
    : await Post.getPost(params.id as string);

  return {
    props: { post: post ? post.toProps() : null },
  };
};

export default View;
export { getStaticPaths, getStaticProps };

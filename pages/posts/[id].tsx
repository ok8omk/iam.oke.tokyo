import { FC } from "react";
import { Post, PostProps } from "../../lib/post";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import OgpMetaTags from "../../components/OgpMetaTags";
import ErrorPage from "next/error";

type Props = {
  post: PostProps;
};

const useStyles = makeStyles({
  title: {
    fontSize: "2rem",
  },
  content: {
    width: "100%",
    fontSize: "1rem",
    wordBreak: "break-all",
    "& img": {
      maxWidth: "100%",
    },
    "& iframe": {
      maxWidth: "100%",
    },
    "& pre": {
      width: "100%",
      overflow: "scroll",
    },
  },
});

const View: FC<Props> = ({ post }) => {
  if (!post) {
    return <ErrorPage statusCode={404} />;
  }

  const classes = useStyles();

  return (
    <>
      <Head>
        <title>{post.title} | iam.oke.tokyo</title>
        <OgpMetaTags
          urlPath={`/posts/${post.id}`}
          title={`${post.title} | iam.oke.tokyo`}
          description={post.description}
        />
      </Head>
      <Container>
        <Typography variant="h1" className={classes.title}>
          {post.title}
        </Typography>
        <Typography variant="overline">
          投稿日:{post.publishedAt} / 最終更新日:
          {post.updatedAt}
        </Typography>
        <Divider />
        <article className={classes.content}>
          {ReactHtmlParser(post.content, { transform })}
        </article>
      </Container>
    </>
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

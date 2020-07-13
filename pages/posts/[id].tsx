import { FC } from "react";
import { Post, getPost, getPostIds } from "../../lib/post";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";

type Props = {
  post: Post;
};

const useStyles = makeStyles({
  title: {
    fontSize: "2rem",
  },
  content: {
    width: "100%",
    fontSize: "1rem",
    "& img": {
      maxWidth: "100%",
    },
    "& iframe": {
      maxWidth: "100%",
    },
  },
});

const View: FC<Props> = ({ post }) => {
  const classes = useStyles();
  return (
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

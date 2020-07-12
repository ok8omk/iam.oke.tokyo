import { FC } from "react";
import { Post, getPost, getPostIds, formatDate } from "../../lib/post";
import { GetStaticPaths, GetStaticProps } from "next";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

type Props = {
  post: Post;
};

const useStyles = makeStyles({
  title: {
    fontSize: "2rem",
  },
  content: {
    width: "100%",
    "& h1": {
      fontSize: "1.5rem",
    },
    "& img": {
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
        投稿日:{formatDate(post.publishedAt)} / 最終更新日:
        {formatDate(post.updatedAt)}
      </Typography>
      <Divider />
      <article
        className={classes.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Container>
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

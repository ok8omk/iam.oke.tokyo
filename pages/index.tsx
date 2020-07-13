import { FC } from "react";
import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Post, getPosts } from "../lib/post";
import { GetStaticProps } from "next";
import Link from "next/link";

type Props = {
  posts: Post[];
};

const Index: FC<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>iam.oke.tokyo</title>
      </Head>
      <Grid container direction="column" spacing={2}>
        {posts.map((post) => {
          const abstract =
            post.createdAt +
            "・" +
            post.content.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, " ");
          return (
            <Grid item key={post.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    variant="subtitle1"
                    color="textSecondary"
                    gutterBottom
                  >
                    <Link href={`/posts/${post.id}`}>
                      <a>{post.title}</a>
                    </Link>
                  </Typography>
                  <Typography variant="body1" component="p">
                    {abstract.slice(0, 70)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
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

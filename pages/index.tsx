import { FC } from "react";
import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Post, PostProps } from "../lib/post";
import { GetStaticProps } from "next";
import OgpMetaTags from "../components/OgpMetaTags";

type Props = {
  posts: PostProps[];
};

const Index: FC<Props> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>iam.oke.tokyo</title>
        <OgpMetaTags
          urlPath="/"
          title="iam.oke.tokyo"
          description="2年目ITエンジニアの無益なブログ。雨の降る日は天気が悪いというような当たり前なことばかり書いている。"
        />
      </Head>
      <Grid container direction="column" spacing={2}>
        {posts.map((post) => {
          const abstract =
            post.publishedAt +
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
                    <a href={`/posts/${post.id}`}>{post.title}</a>
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
  const posts = await Post.getPosts();
  const props = posts.map((post) => post.toProps());

  return {
    props: { posts: props },
  };
};
export default Index;
export { getStaticProps };

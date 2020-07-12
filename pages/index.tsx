import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Post, getPosts, formatDate } from "../lib/post";
import { GetStaticProps } from "next";
import Link from "next/link";

type Props = {
  posts: Post[];
};

const Index: FC<Props> = ({ posts }) => {
  return (
    <>
      <Grid container direction="column" spacing={2}>
        {posts.map((post) => (
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
                  {formatDate(post.createdAt)}・
                  {post.content
                    .replace(/<.+>/g, "")
                    .replace(/<\/[a-z1-9]+>/g, "")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
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

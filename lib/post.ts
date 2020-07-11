type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

const getPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://ok8omk.microcms.io/api/v1/posts", {
    headers: {
      "X-API-KEY": process.env.MICROCMS_API_KEY,
    },
  });
  const resJson = await res.json();
  const posts = resJson.contents as Post[];

  return posts;
};

export type { Post };
export { getPosts };

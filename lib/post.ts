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

const getPostIds = async () => {
  const res = await fetch("https://ok8omk.microcms.io/api/v1/posts?fields=id", {
    headers: {
      "X-API-KEY": process.env.MICROCMS_API_KEY,
    },
  });
  const resJson = await res.json();
  const posts = resJson.contents as Post[];

  return posts.map((post) => {
    return {
      params: { id: post.id },
    };
  });
};

const getPost = async (id: string): Promise<Post> => {
  const res = await fetch(`https://ok8omk.microcms.io/api/v1/posts/${id}`, {
    headers: {
      "X-API-KEY": process.env.MICROCMS_API_KEY,
    },
  });
  const resJson = await res.json();
  const post = resJson as Post;

  return post;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
};

export type { Post };
export { getPosts, getPostIds, getPost, formatDate };

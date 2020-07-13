import cheerio from "cheerio";
import { highlightAuto, configure } from "highlight.js";

configure({
  languages: ["c", "typescript", "ruby"],
});

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
  const posts = resJson.contents.map((post) => {
    return {
      ...post,
      createdAt: formatDate(post.createdAt),
      updatedAt: formatDate(post.updatedAt),
      publishedAt: formatDate(post.publishedAt),
      content: highlightContent(post.content),
    };
  }) as Post[];

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

  return {
    ...post,
    createdAt: formatDate(post.createdAt),
    updatedAt: formatDate(post.updatedAt),
    publishedAt: formatDate(post.publishedAt),
    content: highlightContent(post.content),
  };
};

const highlightContent = (content: string) => {
  const $ = cheerio.load(content, { decodeEntities: false });
  $("pre code").each((_, elm) => {
    const result = highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass("hljs");
  });

  return $("body").html();
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

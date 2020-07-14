import cheerio from "cheerio";
import { highlightAuto, configure } from "highlight.js";

configure({
  languages: ["c", "typescript", "ruby"],
});

type PostProps = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
};

class Post {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  updatedAt: string;

  constructor(param) {
    this.id = param.id;
    this.title = param.title;
    this.content = this.highlightContent(param.content);
    this.publishedAt = this.formatDate(param.publishedAt);
    this.updatedAt = this.formatDate(param.updatedAt);
  }

  static async getPosts(): Promise<Post[]> {
    const res = await fetch("https://ok8omk.microcms.io/api/v1/posts", {
      headers: {
        "X-API-KEY": process.env.MICROCMS_API_KEY,
      },
    });
    const resJson = await res.json();
    const posts = resJson.contents.map((postParam) => {
      return new Post(postParam);
    }) as Post[];

    return posts;
  }

  static async getPost(id: string): Promise<Post> {
    const res = await fetch(`https://ok8omk.microcms.io/api/v1/posts/${id}`, {
      headers: {
        "X-API-KEY": process.env.MICROCMS_API_KEY,
      },
    });
    const resJson = await res.json();
    const postParam = resJson as Post;

    return new Post(postParam);
  }

  toProps(): PostProps {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      publishedAt: this.publishedAt,
      updatedAt: this.updatedAt,
    };
  }

  private highlightContent(content: string): string {
    const $ = cheerio.load(content, { decodeEntities: false });
    $("pre code").each((_, elm) => {
      const result = highlightAuto($(elm).text());
      $(elm).html(result.value);
      $(elm).addClass("hljs");
    });

    return $("body").html();
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}`;
  }
}

export type { PostProps };
export { Post };

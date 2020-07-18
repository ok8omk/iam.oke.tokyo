import { highlight, languages } from "prismjs";

const LANGUAGES = ["js", "tsx", "rb", "yml", "bash", "sql", "vim", "py"];

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
    this.content = this.highlightContent(param.contentParts);
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

  private highlightContent(
    contentParts: { richEditor: string; language: string; sourceCode: string }[]
  ): string {
    let content = "";
    contentParts.forEach(({ richEditor, language, sourceCode }, index) => {
      if (index > 0) {
        content += "<br />";
      }
      content += richEditor;
      if (!LANGUAGES.includes(language)) {
        return;
      }
      content += "<br />";
      content += `<pre class='language-${language}'><code class='language-${language}'>`;
      sourceCode.split("\n").forEach((lineOfsourceCode) => {
        content += highlight(lineOfsourceCode, languages[language], language);
        content += "<br />";
      });
      content += "</code></pre>";
    });
    return content;
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

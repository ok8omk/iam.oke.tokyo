import { Post } from "../../../lib/post";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query.slug as string;
  const draftKey = req.query.draftKey as string;

  if (!slug) {
    return res.status(404).end();
  }

  const previewPost = await Post.getPreviewPost(slug, draftKey);

  if (!previewPost) {
    return res.status(401).json({ message: "Invalid slug" });
  }

  res.setPreviewData({
    slug: previewPost.id,
    draftKey: req.query.draftKey,
  });
  res.writeHead(307, { Location: `/posts/${previewPost.id}` });
  res.end("Preview mode enabled");
};

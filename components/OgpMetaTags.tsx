import { FC } from "react";

type Props = {
  urlPath: string;
  title: string;
  description: string;
};

const OgpMetaTags: FC<Props> = ({ urlPath, title, description }) => {
  return (
    <>
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@ok8omk" />
      <meta name="twitter:creator" content="@ok8omk" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:url" content={`https://iam.oke.tokyo${urlPath}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </>
  );
};

export default OgpMetaTags;

import React from 'react';
import Head from 'next/head';

const appUrl = 'https://stupefied-feynman-8f938f.netlify.app/';

const MetaTags = () => {
  const title = '#UbHacking21';
  const description = "UB Hacking '21 - Challenge by ACVAuctions";
  const ogUrl = `${appUrl}logoWithBg.jpeg`;
  const canonicalUrl = appUrl;
  return (
    <Head>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta property="og:image" content={ogUrl} />
      <meta property="twitter:image" content={ogUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary" />
      <meta property="og:type" content="website" />
      <meta name="keywords" content="ub hacking 21, ub hacking, acv" />
      <meta name="theme-color" content="#f26522" />
      <meta property="og:site_name" content="Car Dent Detector" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#da532c" />
    </Head>
  );
};

export default MetaTags;

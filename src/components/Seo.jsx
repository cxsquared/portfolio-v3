import React from 'react';
import path from 'path';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import config from '../../gatsby-config';

const getSchemaOrgJSONLD = ({
  isBlogPost,
  url,
  title,
  image,
  description,
  datePublished,
}) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: config.siteMetadata.title,
    },
  ];

  return isBlogPost
    ? [
        ...schemaOrgJSONLD,
        {
          '@context': 'http://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              item: {
                '@id': url,
                name: title,
                image,
              },
            },
          ],
        },
        {
          '@context': 'http://schema.org',
          '@type': 'BlogPosting',
          url,
          name: title,
          alternateName: config.siteMetadata.title,
          headline: title,
          image: {
            '@type': 'ImageObject',
            url: image,
          },
          description,
          author: {
            '@type': 'Person',
            name: 'Cody Claborn',
          },
          publisher: {
            '@type': 'Organization',
            url: config.siteMetadata.siteUrl,
            name: 'Cody Claborn',
          },
          mainEntityOfPage: {
            '@type': 'WebSite',
            '@id': config.siteMetadata.siteUrl,
          },
          datePublished,
        },
      ]
    : schemaOrgJSONLD;
};

const Seo = ({ postData, postImage, postUrl, isBlogPost }) => {
  const postMeta = postData.frontmatter;

  const title = postMeta.title || config.title;
  const description =
    postMeta.description || postData.excerpt || config.description;
  const image = `${config.siteMetadata.siteUrl}${postImage}` || false;
  const url = postUrl; 
  const datePublished = isBlogPost ? postMeta.date : false;

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPost,
    url,
    title,
    image,
    description,
    datePublished,
  });

  return (
    <Helmet>
      <title>
	{title}
      </title>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      {isBlogPost ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={config.siteMetadata.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

Seo.propTypes = {
  isBlogPost: PropTypes.bool,
  postData: PropTypes.shape({
    frontmatter: PropTypes.any,
    excerpt: PropTypes.any,
  }).isRequired,
  postImage: PropTypes.string,
  postUrl: PropTypes.string.isRequired
};

Seo.defaultProps = {
  isBlogPost: false,
  postImage: null,
};

export default Seo;

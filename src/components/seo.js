/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

function SEO({ description, lang, meta, title, pathname, image }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            siteUrl
            defaultImage: image
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;
  const siteUrl = `${site.siteMetadata.siteUrl}${pathname || ''}`;
  const thumbnail = image || site.siteMetadata.defaultImage;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        { name: 'title', content: title },
        { name: 'description', content: metaDescription },
        { property: 'og:title', content: title },
        { property: 'og:description', content: metaDescription },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Kelyo' },
        { property: `og:image`, content: thumbnail },
        { property: `og:image:secure_url`, content: thumbnail },
        { property: `og:image:width`, content: '1200' },
        { property: `og:image:height`, content: '630' },
        { property: `og:locale`, content: `fr` },
        { property: 'og:url', content: siteUrl },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:creator', content: site.siteMetadata.author },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: metaDescription },
        { name: 'robots', content: 'index, follow' },
      ].concat(meta)}
    />
  );
}

SEO.defaultProps = {
  lang: 'fr',
  meta: [],
  description: '',
  image: null,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default SEO;

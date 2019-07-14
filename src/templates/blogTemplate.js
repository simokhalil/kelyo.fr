import React from 'react';
import { Disqus } from 'gatsby-plugin-disqus';
import { Link, graphql } from 'gatsby';
import { globalHistory } from '@reach/router';

import Page from '../components/common/Page';
import PageTitle from '../components/common/PageTitle';
import SEO from '../components/seo';
import Section from '../components/common/Section';

import '../styles/blog.css';

const Template = ({ data }) => {
  const { post, config } = data;

  const { id, frontmatter, fields, excerpt, html } = post;

  let disqusConfig = {
    url: `${config.siteMetadata.siteUrl + globalHistory.location.pathname}`,
    identifier: id,
    title: frontmatter.title,
  };

  return (
    <>
      <SEO
        title={frontmatter.title}
        pathname={`/blog/${fields.slug}`}
        description={excerpt}
      />

      <Page>
        <img
          src={frontmatter.image}
          style={{ width: '100%' }}
          alt={frontmatter.title}
        />
        <Section style={{ marginTop: '-50px', width: '95%', minWidth: '95%' }}>
          <PageTitle title={frontmatter.title} description={frontmatter.date} />

          <div className="container">
            <div className="blog-post">
              <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>

          <div className="container">
            <div className="post-meta">
              <div className="info">
                <span className="date">{frontmatter.date}</span>
                <span className="author">{config.siteMetadata.author}</span>
              </div>
            </div>
            <div className="post-tags">
              <div className="tags">
                {frontmatter.tags.map((tag, index) => (
                  <Link
                    to={`/blog/tags/${tag}`}
                    rel={tag}
                    key={index}
                    className="tag"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="container">
            <Disqus config={disqusConfig} />
          </div>
        </Section>
      </Page>
    </>
  );
};

export default Template;

export const pageQuery = graphql`
  query BlogPostQuery($uid: String!) {
    post: markdownRemark(fields: { slug: { eq: $uid } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        image
        categories
        date(formatString: "DD MMMM YYYY", locale: "fr")
        keywords
        tags
        title
      }
    }
    config: site {
      siteMetadata {
        siteUrl
        author
      }
    }
  }
`;

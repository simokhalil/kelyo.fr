import React from 'react';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';
import { globalHistory } from '@reach/router';
import { graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle';
import SEO from '../components/seo';
import Section from '../components/content/Section';

import '../pages/blog.css';

const Template = ({ data }) => {

  const { post, config } = data;

  const { id, frontmatter, fields, excerpt, html } = post;

  let disqusConfig = {
    url: `${config.siteMetadata.siteUrl + globalHistory.location.pathname}`,
    identifier: id,
    title: frontmatter.title,
  }

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        pathname={`/blog/${fields.slug}`}
        description={excerpt}
      />

      <Page>
        <img src={frontmatter.image} style={{ width: '100%' }} alt={frontmatter.title} />
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
                <span className="date">
                  {frontmatter.date}
                </span>
                <span className="author">
                  {config.siteMetadata.author}
                </span>
              </div>
            </div>
            <div className="post-tags">
              <div className="tags">
                {frontmatter.tags.map((tag, index) => (
                  <a href="#" key={index} className="tag">{tag}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="container">
            <CommentCount config={disqusConfig} placeholder={'...'} />
            <Disqus config={disqusConfig} />
          </div>

        </Section>
      </Page>
    </Layout>
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

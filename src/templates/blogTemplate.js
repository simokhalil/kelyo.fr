import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle';
import SEO from '../components/seo';
import Section from '../components/content/Section';

import '../pages/blog.css';

const Template = ({ data: { markdownRemark } }) => {
  const { frontmatter, excerpt, html } = markdownRemark;

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        pathname={`/blog/${frontmatter.path}`}
        description={excerpt}
      />

      <Page>
        <img src={frontmatter.image} style={{ width: '100%' }} />
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
        </Section>
      </Page>
    </Layout>
  );
};

export default Template;

export const pageQuery = graphql`
  query BlogPostQuery($uid: String!) {
    markdownRemark(frontmatter: { path: { eq: $uid } }) {
      html
      excerpt(pruneLength: 250)
      frontmatter {
        date(formatString: "Do MMMM YYYY", locale: "fr")
        path
        title
        image
      }
    }
  }
`;

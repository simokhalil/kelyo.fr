import React from 'react';
import { graphql } from 'gatsby';
import { isMobileOnly } from 'react-device-detect';
import { translate } from 'react-polyglot';

import BlogListItem from '../components/blog/BlogListItem';
import CategoriesList from '../components/blog/sidebar/categories';
import Col from '../components/content/Col';
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle';
import Pagination from '../components/content/Pagination';
import Row from '../components/content/Row';
import SEO from '../components/seo';
import Section from '../components/content/Section';
import TagsList from '../components/blog/sidebar/tags';

import '../styles/blog.css';

const BlogPage = ({ data, pageContext, t }) => {
  const { postList, config } = data;
  const { currentPage, numPages } = pageContext;

  return (
    <>
      <SEO
        title={'pages.blog.title'}
        pathname="/blog/"
        description={t('pages.blog.description')}
      />

      <Page>
        <Section fullWidth={isMobileOnly}>
          <PageTitle title={t('pages.blog.title')} />

          {/* <CategoriesList />
                    <TagsList /> */}

          <div className="container">
            <Row>
              {postList.edges.map(({ node }, index) => {
                const path = `/blog/${node.fields.slug}`;

                return (
                  <Col
                    key={index}
                    xs={12}
                    md={4}
                    lg={6}
                    style={{ padding: '0 1em 2em' }}
                  >
                    <BlogListItem node={node} path={path} config={config} />
                  </Col>
                );
              })}
            </Row>

            <Pagination currentPage={currentPage} numPages={numPages} />
          </div>
        </Section>
      </Page>
    </>
  );
};

export default translate()(BlogPage);

export const listQuery = graphql`
  query PaginatedBlogListQuery($skip: Int!, $limit: Int!) {
    postList: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fields: { collection: { eq: "posts" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            slug
            year
            month
          }
          frontmatter {
            date(formatString: "Do MMMM YYYY", locale: "fr")
            title
            image
          }
        }
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

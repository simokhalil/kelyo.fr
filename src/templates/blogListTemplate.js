import React from 'react';
import { graphql } from 'gatsby';
import { isMobileOnly } from 'react-device-detect';
import { translate } from 'react-polyglot';

import BlogListItem from '../components/blog/BlogListItem';
import CategoriesList from '../components/blog/sidebar/categories';
import Col from '../components/common/Col';
import Page from '../components/common/Page';
import PageTitle from '../components/common/PageTitle';
import Pagination from '../components/common/Pagination';
import Row from '../components/common/Row';
import SEO from '../components/seo';
import Section from '../components/common/Section';
import TagsList from '../components/blog/sidebar/tags';

import '../styles/blog.css';

const BlogPage = ({ data, pageContext, t }) => {
  const { postList, config } = data;
  const { currentPage, numPages } = pageContext;

  // Filter posts to not display future ones
  if (process.env.NODE_ENV !== 'development') {
    postList.edges = postList.edges.filter(edge => new Date(edge.node.fields.date) <= new Date());
  }

  return (
    <>
      <SEO
        title={t('pages.blog.title')}
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
            day
            date
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
        disqusShortName
      }
    }
  }
`;

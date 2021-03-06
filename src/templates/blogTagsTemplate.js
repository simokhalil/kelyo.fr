import React from 'react';
import { graphql } from 'gatsby';
import { isMobileOnly } from 'react-device-detect';

import BlogListItem from '../components/blog/BlogListItem';
import Col from '../components/common/Col';
import Page from '../components/common/Page';
import PageTitle from '../components/common/PageTitle';
import Pagination from '../components/common/Pagination';
import Row from '../components/common/Row';
import SEO from '../components/seo';
import Section from '../components/common/Section';

import '../styles/blog.css';

const BlogTagsTemplate = ({ data, pageContext }) => {
  const { postList, config } = data;
  const { currentPage, numPages, tag } = pageContext;

  return (
    <>
      <SEO
        title="Blog - Tags"
        pathname={`/blog/tags/${tag}`}
        description="Kelyo Blog. Blog de Khalil EL ISMAILI. News tech, Tutoriaux Dév, astuces, et plein d'autres choses"
      />

      <Page>
        <Section fullWidth={isMobileOnly}>
          <PageTitle title={`Blog - Tags - ${tag}`} />

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

export default BlogTagsTemplate;

export const listQuery = graphql`
  query PaginatedBlogTagQuery($tag: String!, $skip: Int!, $limit: Int!) {
    postList: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        fields: { collection: { eq: "posts" } }
        frontmatter: { tags: { in: [$tag] } }
      }
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

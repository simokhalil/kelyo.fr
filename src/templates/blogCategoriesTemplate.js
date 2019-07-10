import React from 'react';
import { graphql } from 'gatsby';
import { isMobileOnly } from 'react-device-detect';

import BlogListItem from '../components/blog/BlogListItem';
import Col from '../components/content/Col';
import Layout from '../components/layout/layout';
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle';
import Pagination from '../components/content/Pagination';
import Row from '../components/content/Row';
import SEO from '../components/seo';
import Section from '../components/content/Section';

import '../styles/blog.css';

const BlogCategoriesTemplate = ({ data, pageContext }) => {
    const { postList, config } = data;
    const { currentPage, numPages, category } = pageContext;

    return (
        <Layout>
            <SEO
                title={`Blog - Catégories - ${category}`}
                pathname={`/blog/categories/${category}`}
                description="Kelyo Blog. Blog de Khalil EL ISMAILI. News tech, Tutoriaux Dév, astuces, et plein d'autres choses"
            />

            <Page>
                <Section fullWidth={isMobileOnly}>
                    <PageTitle title={`Blog - Catégories - ${category}`} />

                    <div className="container">
                        <Row>
                            {postList.edges.map(({ node }, index) => {
                                const path = `/blog/${node.fields.year}/${node.fields.month}/${node.fields.slug}`;

                                return (
                                    <Col
                                        key={index}
                                        xs={12}
                                        md={4}
                                        lg={6}
                                        style={{ padding: '0 1em 2em' }}
                                    >
                                        <BlogListItem
                                            node={node}
                                            path={path}
                                            config={config}
                                        />
                                    </Col>
                                )
                            })}
                        </Row>

                        <Pagination currentPage={currentPage} numPages={numPages} />
                    </div>
                </Section>
            </Page>
        </Layout>
    );
};

export default BlogCategoriesTemplate;

export const listQuery = graphql`
  query PaginatedBlogCategoryQuery($category: String!, $skip: Int!, $limit: Int!) {
    postList: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {fields: {collection: {eq: "posts"}}, frontmatter: {categories: {in: [$category]}} }
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

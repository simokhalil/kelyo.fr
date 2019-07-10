import React from 'react';
import { CommentCount } from 'gatsby-plugin-disqus';
import { Link, graphql } from 'gatsby';
import { isMobileOnly } from 'react-device-detect';

import CategoriesList from '../components/blog/sidebar/categories';
import Col from '../components/content/Col';
import Layout from '../components/layout/layout';
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle';
import Row from '../components/content/Row';
import SEO from '../components/seo';
import Section from '../components/content/Section';
import TagsList from '../components/blog/sidebar/tags';

import './blog.css';

const BlogPage = props => {
  console.log(props.data);

  const { postList, config } = props.data;

  return (
    <Layout>
      <SEO
        title="Blog"
        pathname="/blog/"
        description="Kelyo Blog. Blog de Khalil EL ISMAILI. News tech, Tutoriaux Dév, astuces, et plein d'autres choses"
      />

      <Page>
        <Section fullWidth={isMobileOnly}>
          <PageTitle title="Blog" />

          <CategoriesList />
          <TagsList />

          <div className="container">
            <Row>
              {postList.edges.map(({ node }, index) => (
                <Col
                  key={index}
                  xs={12}
                  md={4}
                  lg={6}
                  style={{ padding: '0 1em 2em' }}
                >
                  <div className="blog-item">
                    <Link to={`/blog/${node.fields.slug}`} className="link">
                      <div className="image-holder">
                        <img
                          src={node.frontmatter.image}
                          className="image"
                          alt={node.frontmatter.title}
                        />
                      </div>
                      <div
                        className="post-info"
                        style={{ padding: '1em 1.4em 1.4em' }}
                      >
                        <span className="blog-item-meta date">
                          {node.frontmatter.date}
                        </span>
                        <span className="blog-item-meta comments">
                          <CommentCount
                            config={{
                              url: `${config.siteMetadata.siteUrl}/blog/${node.fields.slug}`,
                              identifier: node.id,
                              title: node.frontmatter.title,
                            }}
                            placeholder={'...'} />
                        </span>
                        <h4>{node.frontmatter.title}</h4>
                        {/* <p>{node.excerpt}</p> */}
                      </div>
                    </Link>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Section>
      </Page>
    </Layout>
  );
};

export default BlogPage;

export const listQuery = graphql`
  query BlogListQuery {
    postList: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {fields: {collection: {eq: "posts"}}}
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          fields {
            slug
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

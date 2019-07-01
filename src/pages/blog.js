import React from 'react'
import { Link, graphql } from 'gatsby';
import { isMobileOnly } from "react-device-detect";

import Col from '../components/content/Col';
import Layout from '../components/layout/layout';
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle';
import Row from '../components/content/Row';
import SEO from '../components/seo';
import Section from '../components/content/Section';

import './blog.css';

const BlogPage = (props) => {

  const postList = props.data.allMarkdownRemark;

  return (
    <Layout>
      <SEO
        title="Blog"
        pathname='/blog/'
      />

      <Page>
        <Section fullWidth={isMobileOnly}>
          <PageTitle title="Blog" />

          <Row>
            {postList.edges.map(({ node }, index) => (
              <Col xs={12} md={4} lg={6} style={{ padding: '0 1em 2em' }}>
                <div className="blog-item">
                  <Link key={index} to={`/blog/${node.frontmatter.path}`} className="link" >
                    <div className="image-holder">
                      <img src={node.frontmatter.image} className="image" alt={node.frontmatter.title} />
                    </div>
                    <div className="post-info" style={{ padding: '1em 1.4em 1.4em' }}>
                      <span className="post-date" style={{ color: '#888', fontSize: '11px', fontWeight: '300' }}>{node.frontmatter.date}</span>
                      <h4>{node.frontmatter.title}</h4>
                      {/* <p>{node.excerpt}</p> */}
                    </div>
                  </Link>
                </div>
              </Col>
            ))}

          </Row>
        </Section>
      </Page>
    </Layout>
  )
}

export default BlogPage;

export const listQuery = graphql`
  query BlogListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          frontmatter {
            path
            date(formatString: "Do MMMM YYYY", locale: "fr")
            title
            image
          }
        }
      }
    }
  }
`
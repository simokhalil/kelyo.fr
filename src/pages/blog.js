import React from 'react'
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle';
import SEO from '../components/seo';
import Section from '../components/content/Section';

const BlogPage = (props) => {
    const postList = props.data.allMarkdownRemark;
    return (
        <Layout>
            <SEO
                title="Blog"
                pathname='/blog/'
            />

            <Page>
                <Section>
                    <PageTitle title="Blog" />

                    {postList.edges.map(({ node }, index) => (
                        <Link key={index} to={`/blog/${node.frontmatter.path}`} className="link" >
                            <div className="post-list">
                                <h1>{node.frontmatter.title}</h1>
                                <span>{node.frontmatter.date}</span>
                                <p>{node.excerpt}</p>
                            </div>
                        </Link>
                    ))}
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
            date(formatString: "MMMM Do YYYY")
            title
          }
        }
      }
    }
  }
`
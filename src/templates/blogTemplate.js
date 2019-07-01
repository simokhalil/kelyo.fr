import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle';
import SEO from '../components/seo';
import Section from '../components/content/Section';

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
                <Section>
                    <PageTitle title={frontmatter.title} description={frontmatter.date} />

                    <div className="blog-post-container">
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
    )
}

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
            }
        }
    }
`;

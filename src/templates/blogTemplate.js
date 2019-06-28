import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle';
import Section from '../components/content/Section';

const Template = ({ data: { markdownRemark } }) => {
    const { frontmatter, html } = markdownRemark;

    return (
        <Layout>
            <Page>
                <PageTitle title={frontmatter.title} description={frontmatter.date} />

                <Section>
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
            frontmatter {
                date(formatString: "MMMM DD, YYYY")
                path
                title
            }
        }
    }
`;

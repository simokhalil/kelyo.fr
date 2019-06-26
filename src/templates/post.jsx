import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle.js';
import Section from '../components/content/Section';

const Post = ({ data: { prismicPost } }) => {
  const { data } = prismicPost;
  return (
    <Layout>
      <Page>
        <Section>
          <PageTitle title={data.title.text} />

          <div dangerouslySetInnerHTML={{ __html: data.content.html }} />
        </Section>
      </Page>
    </Layout>
  );
};

export default Post;

export const pageQuery = graphql`
  query PostBySlug($uid: String!) {
    prismicPost(uid: { eq: $uid }) {
      uid
      data {
        title {
          text
        }
        content {
          html
        }
      }
    }
  }
`;

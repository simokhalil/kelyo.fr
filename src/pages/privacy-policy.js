import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/layout/layout';
import Page from '../components/content/Page';
import PageTitle from '../components/content/PageTitle';
import SEO from '../components/seo';
import Section from '../components/content/Section';

const useStyles = makeStyles({
  content: {
    margin: 'auto',
    textAlign: 'justify',

    '& > h2': {
      margin: '30px 0 5px',
    },
  },
});

const PrivacyPolicyPage = () => {

  const data = useStaticQuery(graphql`
    query PrivacyPageQuery {
      file(sourceInstanceName: {eq: "pages_content"}, name: {eq: "privacy"}) {
        id
        childMarkdownRemark {
          frontmatter {
            title
          }
          html
        }
      }
    }
  `);

  const { html, frontmatter: { title } } = data.file.childMarkdownRemark;

  const classes = useStyles();

  return (
    <Layout>
      <SEO title="Politique de confidentialité" />

      <Page>
        <Section>
          <PageTitle
            title={title}
            description=""
            pathname="/privacy-policy/"
          />

          <div dangerouslySetInnerHTML={{ __html: html }} className={classes.content} />
        </Section>
      </Page>
    </Layout>
  );
}

export default PrivacyPolicyPage;

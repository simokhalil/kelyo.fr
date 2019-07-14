import React from 'react';
import { makeStyles } from '@material-ui/core';
import { translate } from 'react-polyglot';
import { useStaticQuery, graphql } from 'gatsby';

import Page from '../components/common/Page';
import PageTitle from '../components/common/PageTitle';
import SEO from '../components/seo';
import Section from '../components/common/Section';

const useStyles = makeStyles({
  content: {
    margin: 'auto',
    textAlign: 'justify',

    '& > h2': {
      margin: '30px 0 5px',
    },
  },
});

const CookiesPolicyPage = ({ t }) => {
  const data = useStaticQuery(graphql`
    query CookiesPageQuery {
      file(
        sourceInstanceName: { eq: "pages_content" }
        name: { eq: "cookies" }
      ) {
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

  const {
    html,
    frontmatter: { title },
  } = data.file.childMarkdownRemark;

  const classes = useStyles();

  return (
    <>
      <SEO title={title} />

      <Page>
        <Section>
          <PageTitle title={title} description="" pathname="/privacy-policy/" />

          <div
            dangerouslySetInnerHTML={{ __html: html }}
            className={classes.content}
          />
        </Section>
      </Page>
    </>
  );
};

export default translate()(CookiesPolicyPage);

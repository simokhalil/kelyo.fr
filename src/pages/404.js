import React from 'react';

import Button from '../components/form/Button';
import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import Page from '../components/content/Page';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: '72px',
    lineHeight: '72px',
    fontWeight: '600',
    color: '#ccc',
  },
});

const NotFoundPage = () => {
  const classes = useStyles();

  return (
    <Layout>
      <SEO title="404: Not found" />

      <Page>
        <div className={classes.root}>
          <h1 className={classes.h1}>404</h1>
          <h2>PAGE INTROUVABLE</h2>
          <p>L'Url que vous tentez de visiter n'existe pas</p>
          <Button href="/">Retour à l'accueil</Button>
        </div>
      </Page>
    </Layout>
  );
};

export default NotFoundPage;

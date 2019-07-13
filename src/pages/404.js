import React from 'react';
import { translate } from 'react-polyglot';

import Button from '../components/form/Button';
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

const NotFoundPage = ({ t }) => {
  const classes = useStyles();

  return (
    <>
      <SEO title={t('pages.404.title')} />

      <Page>
        <div className={classes.root}>
          <h1 className={classes.h1}>404</h1>
          <h2>{t('pages.404.pageNotFound')}</h2>
          <p>{t('pages.404.urlNotFound')}</p>
          <Button href="/">{t('common.backToHome')}</Button>
        </div>
      </Page>
    </>
  );
};

export default translate()(NotFoundPage);

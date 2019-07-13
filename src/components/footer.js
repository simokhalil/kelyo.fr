import React from 'react';
import { Link } from 'gatsby';
import { translate } from 'react-polyglot';
import { useStaticQuery, graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  footer: {
    display: 'block',
    backgroundColor: '#fff',
    fontSize: '.8rem',
    textAlign: 'center',
    height: 'auto',
    padding: '20px',
  },
  link: {
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const Footer = ({ t }) => {
  const classes = useStyles();

  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
      <footer className={classes.footer}>
        <div className="copyrights">
          © {new Date().getFullYear()}{' '}
          <a href="https://www.linkedin.com/in/khalilelismaili/" className={classes.link}>
            {data.site.siteMetadata.title}
          </a>{' '}
          - <a href="https://www.gatsbyjs.org/" className={classes.link}>GatsbyJS</a>{' '}
          + <a href="https://www.netlifycms.org/" className={classes.link}>Netlify CMS</a> = ♥
        </div>

        <div className="footer-links">
        <Link to="/privacy-policy" className={classes.link}>{t('footer.privacyPolicy')}</Link> | <Link to="/cookies" className={classes.link}>{t('footer.cookiesPolicy')}</Link>
        </div>
      </footer>
  );
};

export default translate()(Footer);

import React from 'react';
import { Link } from 'gatsby';

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

const Footer = () => {
  const classes = useStyles();

  return (
      <footer className={classes.footer}>
        <div className="copyrights">
          © {new Date().getFullYear()}{' '}
          <a href="https://www.linkedin.com/in/khalilelismaili/" className={classes.link}>
            Khalil EL ISMAILI
          </a>{' '}
          - All rights reserved. <a href="https://www.gatsbyjs.org/" className={classes.link}>GatsbyJS</a>{' '}
          + <a href="https://www.netlifycms.org/" className={classes.link}>Netlify CMS</a> = ♥
        </div>

        <div className="footer-links">
          <Link to="/privacy-policy" className={classes.link}>Politique de confidentialité</Link> | <Link to="/cookies" className={classes.link}>Gestion des cookies</Link>
        </div>
      </footer>
  );
};

export default Footer;

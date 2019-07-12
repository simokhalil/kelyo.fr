import React from 'react';
import { Link } from 'gatsby';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  footer: {
    display: 'block',
    maxWidth: '750px',
    margin: '20px auto 0 auto',
    fontSize: '.8rem',
    textAlign: 'center',
    height: 'auto',
    padding: '20px',
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div className="copyrights">
        © {new Date().getFullYear()}{' '}
        <a href="https://www.linkedin.com/in/khalilelismaili/">
          Khalil EL ISMAILI
        </a>{' '}
        - All rights reserved. <a href="https://www.gatsbyjs.org/">GatsbyJS</a>{' '}
        + <a href="https://www.netlifycms.org/">Netlify CMS</a> = ♥
      </div>

      <div className="footer-links">
        <Link to="/cookie-policy">Politique de confidentialité</Link>
      </div>
    </footer>
  );
};

export default Footer;

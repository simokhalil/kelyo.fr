import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'gatsby';
import { globalHistory } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';

import SocialLinks from './content/SocialLinks';

import './header.css';

const links = [
  {
    path: '/',
    label: 'Accueil',
  },
  {
    path: '/resume/',
    label: 'Mon CV',
  },
  {
    path: '/contact/',
    label: 'Contact',
  },
];

const Header = ({ siteTitle, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      file(name: { eq: "resume" }, sourceInstanceName: { eq: "data" }) {
        childDataJson {
          basics {
            profiles {
              network
              url
              username
            }
          }
        }
      }
    }
  `);

  const { profiles } = data.file.childDataJson.basics;

  const toggleMenu = event => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className={`header animate ${isOpen ? '' : 'mobile-menu-hide'}`}>
        <div className="header-content">
          <div className="header-image">
            <Link to="/">
              <img src="/images/kelyo_logo.png" alt={siteTitle} />
            </Link>
          </div>

          <div className="site-title-block">
            <Link to="/" className="site-title">
              {siteTitle}
            </Link>
          </div>

          <div className="site-nav dl-menuwrapper">
            <ul className="site-main-menu site-auto-menu">
              {links.map((link, index) => (
                <li
                  className={
                    globalHistory.location.pathname === link.path
                      ? 'active'
                      : ''
                  }
                  key={index}
                >
                  <Link to={link.path} className="pt-trigger">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <SocialLinks profiles={profiles} />
        </div>
      </header>

      <div className="mobile-header mobile-visible">
        <div className="mobile-logo-container">
          <div className="mobile-header-image">
            <Link to="/">
              <img src="/images/kelyo_logo.png" alt={siteTitle} />
            </Link>
          </div>

          <div className="mobile-site-title">
            <Link to="/">{siteTitle}</Link>
          </div>
        </div>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="menu-toggle">
          <i className="fa fa-bars" />
        </button>
      </div>
    </>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

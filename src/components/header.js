import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import { globalHistory } from '@reach/router';
import { translate } from 'react-polyglot';
import { useStaticQuery, graphql } from 'gatsby';

import SocialLinks from './content/SocialLinks';

import './header.css';

const Header = ({ siteTitle, t, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const data = useStaticQuery(graphql`
    query HeaderQuery {
      resume: file(name: { eq: "resume" }, sourceInstanceName: { eq: "data" }) {
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
      config: site {
        siteMetadata {
          menus {
            resume
            contact
            blog
          }
        }
      }
    }
  `);

  const { profiles } = data.resume.childDataJson.basics;

  const { menus } = data.config.siteMetadata;

  const links = [
    {
      path: '/',
      exact: true,
      label: t('menus.home'),
      isEnabled: globalHistory.location.pathname === '/',
    },
    {
      path: '/resume/',
      exact: true,
      label: t('menus.resume'),
      isEnabled: menus.resume,
      isActive: globalHistory.location.pathname === '/resume/',
    },
    {
      path: '/blog/',
      exact: false,
      label: t('menus.blog'),
      isEnabled: menus.resume,
      isActive: globalHistory.location.pathname.startsWith('/blog/'),
    },
    {
      path: '/contact/',
      exact: true,
      label: t('menus.contact'),
      isEnabled: menus.contact,
      isActive: globalHistory.location.pathname === '/contact/',
    },
  ];

  const toggleMenu = event => {
    if (event) {
      event.preventDefault();
    }
    setIsOpen(!isOpen);
  };

  const setActiveMenu = (index) => {
    links.forEach(link => link.isActive = false);
    links[index].isActive = true;
    toggleMenu();
  };

  const getPageTransitionDirection = (index) => {
    // const pageTransitionDirections = ['up', 'left', 'right', 'down'];
    // pageTransitionDirections[Math.floor(Math.random() * pageTransitionDirections.length)]
    const activeIndex = links.findIndex((link) => link.isActive);
    return index < activeIndex ? 'right' : 'left';
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
            <AniLink
              swipe
              entryOffset={20}
              duration={1} to="/"
              className="site-title"
            >
              {siteTitle}
            </AniLink>
          </div>

          <div className="site-nav dl-menuwrapper">
            <ul className="site-main-menu site-auto-menu">
              {links.map((link, index) => (
                <li
                  className={
                    (!link.exact &&
                      globalHistory.location.pathname.startsWith(link.path)) ||
                    (link.exact &&
                      globalHistory.location.pathname === link.path)
                      ? 'active'
                      : ''
                  }
                  key={index}
                >
                  <AniLink
                    swipe
                    direction={getPageTransitionDirection(index)}
                    to={link.path}
                    top={getPageTransitionDirection(index) === 'left' ? 'entry' : 'exit'}
                    entryOffset={20}
                    duration={0.5}
                    className="pt-trigger"
                    onClick={() => setActiveMenu(index)}
                  >
                    {link.label}
                  </AniLink>
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

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="menu-toggle"
        >
          <FontAwesomeIcon icon={['fas', 'bars']} />
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

export default translate()(Header);

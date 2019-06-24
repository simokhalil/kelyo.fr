import PropTypes from "prop-types";
import React from "react";
import { Link } from "gatsby";
import { globalHistory } from "@reach/router";
import { useStaticQuery, graphql } from 'gatsby';

import SocialLinks from './content/SocialLinks';

import './header.css';

const links = [
  {
    path: '/',
    label: 'Accueil',
  }, {
    path: '/resume',
    label: 'Mon CV',
  }, {
    path: '/contact',
    label: 'Contact',
  }
];

const Header = ({ siteTitle, ...props }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      file(name: {eq: "resume"}, sourceInstanceName: {eq: "data"}) {
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

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-image">
          <Link to="/">
            <img src="/images/profile_sm.png" alt="Khalil EL ISMAILI" />
          </Link>
        </div>

        <div className="site-title-block">
          <Link to="/">
            <h1 className="site-title">
              {siteTitle}
            </h1>
          </Link>
        </div>

        <div className="site-nav dl-menuwrapper">
          <ul className="site-main-menu site-auto-menu">
            {links.map((link, index) => (
              <li className={globalHistory.location.pathname === link.path ? 'active' : ''} key={index}>
                <Link to={link.path} className="pt-trigger">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <SocialLinks profiles={profiles} />

        <div className="copyrights">
          © {new Date().getFullYear()}, Built with ReactJS
        </div>

      </div>
    </header>
  );
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

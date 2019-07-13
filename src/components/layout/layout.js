/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { I18n } from 'react-polyglot';
import { useStaticQuery, graphql } from 'gatsby';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

import Header from '../header';
import MessagesFrench from '../../i18n/fr';
import './layout.css';
import '../../styles/layout-overide.css';
import 'devicon/devicon.min.css';
import 'cookieconsent/build/cookieconsent.min.css';

try {
  require('cookieconsent');

  console.log('cookieContent', window.cookieconsent);

  window.cookieconsent.initialise({
    "palette": {
      "popup": {
        "background": "#0672c3"
      },
      "button": {
        "background": "transparent",
        "text": "#fff",
        "border": "#fff"
      }
    },
    "position": "bottom-right",
    "content": {
      "message": "Hé oui, ici aussi les cookies sont de la partie...\nPourquoi ? Tout simplement pour avoir une idée de comment le site est fréquenté.\nSi vous restez, c'est que vous êtes à priori d'accord sur le principe",
      "dismiss": "OK",
      "link": "Je veux en savoir plus",
      "href": "https://www.kelyo.fr"
    }
  });
} catch (e) {
  console.log(e)
}

library.add(fab, far, fas, faCheckSquare, faMobileAlt);

const Layout = ({ children, location, ...props }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)


  return (
    <I18n locale="fr" messages={MessagesFrench}>
      <div className="page-layout">
        <Header siteTitle={data.site.siteMetadata.title} />
        <main className="site-main">
          <div className="pt-wrapper">
            <div className="subpages">
              {children}
            </div>
          </div>
        </main>
      </div>
    </I18n>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

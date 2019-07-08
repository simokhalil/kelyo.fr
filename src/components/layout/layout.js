/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

import Header from "../header"
import "./layout.css"
import "../../styles/layout-overide.css";

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
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

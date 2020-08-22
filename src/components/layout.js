import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "../styles/global.scss"

import { StoreContext } from "../context/StoreContext"

import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const { isCartOpen } = useContext(StoreContext)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        className={`body ${isCartOpen ? "cart-open" : ""}`}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <main className="section" style={{ minHeight: "90vh" }}>
          {children}
        </main>
        <footer
          className="footer"
          style={{ background: "var(--darkPurp)", color: "white" }}
        >
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Nav = () => {
  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query NavQuery {
        allShopifyCollection {
          edges {
            node {
              title
              handle
            }
          }
        }
      }
    `
  )

  return (
    <nav>
      {allShopifyCollection.edges.map(({ node: nav }) => {
        return (
          <Link
            to={`/category/${nav.handle}`}
            key={nav.handle}
            style={{ color: "#fff", marginRight: 20 }}
          >
            {nav.title}
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav

import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Billboard from "../components/billboard"
import ProductListing from "../components/product-listing"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Billboard />
    <ProductListing />
  </Layout>
)

export default IndexPage

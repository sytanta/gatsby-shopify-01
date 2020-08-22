import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import ProductListingItem from "../components/product-listing/product-listing-item"

const CategoryDetailTemplate = ({ data }) => {
  const { shopifyCollection } = data

  return (
    <Layout>
      <div>
        <h2 className="title">{shopifyCollection.title}</h2>
        <div className="columns is-multiline">
          {shopifyCollection.products.map(product => (
            <ProductListingItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default CategoryDetailTemplate

export const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      products {
        id
        handle
        title
        description
        productType
        variants {
          id
          shopifyId
          title
          price
          sku
          availableForSale
        }
        images {
          id
          localFile {
            childImageSharp {
              fluid(maxWidth: 400, maxHeight: 400) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`

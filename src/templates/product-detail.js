import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import { formatPrice } from "../util/price"

import Layout from "../components/layout"
import AddToCart from "../components/cart/add-to-cart"

const ProductDetailTemplate = ({ data }) => {
  const { shopifyProduct: product } = data
  const {
    images: [firstImage],
    variants: [firstVariant],
  } = product

  return (
    <Layout>
      <div className="columns">
        <div className="column">
          <Image fluid={firstImage.localFile.childImageSharp.fluid} />
        </div>
        <div className="column">
          <h1 className="title">{product.title}</h1>
          <p className="subtitle is-4">{formatPrice(firstVariant.price)}</p>
          <p>{product.description}</p>
          <AddToCart
            variantId={firstVariant.shopifyId}
            style={{ marginTop: '2rem' }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetailTemplate

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
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
`

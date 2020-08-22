import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { formatPrice } from "../util/price"

const Billboard = () => {
  const { shopifyProduct: product } = useStaticQuery(
    graphql`
      query billboardQuery {
        shopifyProduct(vendor: { eq: "FruitLover" }) {
          title
          handle
          description
          variants {
            price
          }
          images {
            localFile {
              childImageSharp {
                fluid(maxWidth: 800, maxHeight: 400) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    `
  )

  if (!product) {
    return <></>
  }

  const {
    images: [firstImage],
    variants: [firstVariant],
  } = product

  return (
    <div style={{ marginBottom: "3rem" }}>
      <div className="columns">
        <div className="column">
          <Image fluid={firstImage.localFile.childImageSharp.fluid} />
        </div>
        <div className="column">
          <h2 className="title">Now Available</h2>
          <h3 className="title">{product.title}</h3>
          <p className="subtitle is-4">{formatPrice(firstVariant.price)}</p>
          <Link to={`/product/${product.handle}`} className="button">
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Billboard

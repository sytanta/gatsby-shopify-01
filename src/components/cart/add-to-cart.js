import React, { useContext } from "react"

import { StoreContext } from "../../context/StoreContext"

const AddToCart = ({ variantId, style = {} }) => {
  const { addProductToCart } = useContext(StoreContext)

  return (
    <button
      style={style}
      className="button is-primary is-rounded"
      onClick={() => addProductToCart(variantId)}
    >
      Add To Cart
    </button>
  )
}

export default AddToCart

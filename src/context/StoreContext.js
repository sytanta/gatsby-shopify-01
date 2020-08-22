import React, { createContext, useState, useEffect } from "react"
import Client from "shopify-buy"

const client = Client.buildClient({
  domain: process.env.GATSBY_SHOPIFY_SHOP_LINK,
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
})

const defaultValue = {
  isCartOpen: false,
  cart: [],
  addProductToCart: () => {},
  removeProductFromCart: () => {},
  checkCoupon: () => {},
  client,
  checkout: {
    lineItems: [],
  },
}

const isBrowser = typeof window !== "undefined"

export const StoreContext = createContext(defaultValue)

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(defaultValue.checkout)
  const [isCartOpen, setCartOpen] = useState(defaultValue.isCartOpen)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    initialCheckout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getNewCheckout = async () => {
    try {
      const newCheckout = await client.checkout.create()

      if (isBrowser) {
        localStorage.setItem("checkout_id", newCheckout.id)
      }

      return newCheckout
    } catch (e) {}
  }

  const initialCheckout = async () => {
    try {
      const currentCheckoutId = isBrowser
        ? localStorage.getItem("checkout_id")
        : ""

      let newCheckout = defaultValue.checkout
      if (currentCheckoutId) {
        newCheckout = await client.checkout.fetch(currentCheckoutId)

        if (newCheckout.completedAt) {
          newCheckout = await getNewCheckout(isBrowser)
        }
      } else {
        newCheckout = await getNewCheckout(isBrowser)
      }

      setCheckout(newCheckout)
    } catch (e) {}
  }

  const addProductToCart = async variantId => {
    try {
      setLoading(true)

      const lineItems = [
        {
          variantId,
          quantity: 1,
        },
      ]

      const newCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItems
      )

      setCheckout(newCheckout)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  const removeProductFromCart = async lineItemId => {
    try {
      setLoading(true)

      const newCheckout = await client.checkout.removeLineItems(checkout.id, [
        lineItemId,
      ])

      setCheckout(newCheckout)
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  const checkCoupon = async coupon => {
    if (!coupon) {
      return
    }

    setLoading(true)

    const newCheckout = await client.checkout.addDiscount(checkout.id, coupon)

    setCheckout(newCheckout)
    setLoading(false)
  }

  const removeCoupon = async coupon => {
    setLoading(true)

    const newCheckout = await client.checkout.removeDiscount(
      checkout.id,
      coupon
    )

    setCheckout(newCheckout)
    setLoading(false)
  }

  const toggleCartOpen = state => {
    setCartOpen(!isCartOpen)
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValue,
        isCartOpen,
        checkout,
        addProductToCart,
        removeProductFromCart,
        checkCoupon,
        removeCoupon,
        toggleCartOpen,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

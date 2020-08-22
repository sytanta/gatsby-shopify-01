import React, { useContext, useState } from "react"
import { animated } from "react-spring"

import { StoreContext } from "../../context/StoreContext"

import { formatPrice } from "../../util/price"

const Cart = ({ style }) => {
  const {
    checkout,
    toggleCartOpen,
    removeProductFromCart,
    checkCoupon,
    removeCoupon,
  } = useContext(StoreContext)

  const [coupon, setCoupon] = useState("")

  return (
    <animated.div
      className="cart-container"
      style={{
        ...style,
      }}
    >
      <div style={{ height: "100%", overflow: "auto" }}>
        <button
          onClick={toggleCartOpen}
          className="delete is-large"
          style={{
            background: "var(--red)",
            position: "absolute",
            right: 10,
            top: 10,
          }}
        >
          Close cart
        </button>
        <h3 className="title">Cart</h3>
        {!!checkout.lineItems.length ? (
          <>
            {checkout.lineItems.map(item => (
              <div
                key={item.id}
                style={{ display: "flex", marginBottom: "2rem" }}
              >
                <div
                  style={{
                    height: 60,
                    marginRight: 10,
                    overflow: "hidden",
                    width: 60,
                  }}
                >
                  <img src={item.variant.image.src} alt={item.title} />
                </div>
                <div>
                  <h4 className="title is-4">{item.title}</h4>
                  <p className="subtitle is-5">
                    {formatPrice(item.variant.price)}
                  </p>
                  <p className="subtitle is-5">Qty: {item.quantity}</p>
                  <button
                    onClick={() => removeProductFromCart(item.id)}
                    className="button is-small is-danger is-outlined"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div>
              {!!checkout.discountApplications.length ? (
                <div>
                  Coupon:
                  <h5 className="title">
                    {checkout.discountApplications[0].code} -{" "}
                    {checkout.discountApplications[0].value.percentage}% off
                  </h5>
                  <button
                    onClick={() => {
                      setCoupon("")
                      removeCoupon(checkout.discountApplications[0].code)
                    }}
                    className="button is-small is-danger is-outlined"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={e => {
                    e.preventDefault()
                    checkCoupon(coupon)
                  }}
                >
                  <div className="field">
                    <label htmlFor="coupon" className="label">
                      Coupon
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={coupon}
                      onChange={e => setCoupon(e.target.value)}
                    />
                  </div>
                  <button className="button">Add Coupon</button>{" "}
                  <span
                    onClick={() => checkCoupon("gatsby")}
                    className="button is-transparent"
                  >
                    Try with "<strong>gatsby</strong>"!
                  </span>
                </form>
              )}
            </div>
            <hr />
            Total: <h5 className="title">{formatPrice(checkout.totalPrice)}</h5>
            <div>
              <a
                href={checkout.webUrl}
                className="button is-success is-fullwidth"
              >
                Checkout Now
              </a>
            </div>
          </>
        ) : (
          <p>No items in cart</p>
        )}
      </div>
    </animated.div>
  )
}

export default Cart

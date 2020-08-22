import React, { useContext } from "react"
import { Link } from "gatsby"
import { useTransition } from "react-spring"
import PropTypes from "prop-types"
import { FaShoppingCart } from "react-icons/fa"

import { StoreContext } from "../context/StoreContext"

import Nav from "./nav"
import Cart from "./cart/cart"
import Loader from "./loader"

import logo from "../images/logo.svg"

const Header = ({ siteTitle }) => {
  const { checkout, isCartOpen, toggleCartOpen } = useContext(StoreContext)

  const transitions = useTransition(isCartOpen, null, {
    from: { transform: "translate3d(100%, 0 , 0)" },
    enter: { transform: "translate3d(0, 0 , 0)" },
    leave: { transform: "translate3d(100%, 0 , 0)" },
  })

  const qty = checkout.lineItems.reduce(
    (total, item) => item.quantity + total,
    0
  )

  return (
    <>
      <header
        style={{
          background: "var(--purp)",
          boxShadow: "var(--elevation-2)",
          padding: "10px 2%",
        }}
      >
        <div className="level is-mobile">
          <div className="level-left">
            <Link to="/">
              <img
                style={{ height: 60, maxHeight: "none", marginBottom: 0 }}
                src={logo}
                alt="Level Up Logo"
              />
            </Link>
          </div>
          <div className="level-right">
            <div>
              <button
                onClick={toggleCartOpen}
                className="button"
                style={{
                  background: "transparent",
                  border: "none",
                  position: "relative",
                }}
              >
                {!!qty && (
                  <div
                    style={{
                      background: "var(--red)",
                      borderRadius: 15,
                      color: "white",
                      height: 30,
                      left: -5,
                      lineHeight: "30px",
                      position: "absolute",
                      textAlign: "center",
                      top: -5,
                      width: 30,
                    }}
                  >
                    {qty}
                  </div>
                )}
                <FaShoppingCart
                  style={{ color: "white", height: 30, width: 30 }}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="level is-mobile" style={{ marginBottom: 10 }}>
          <Nav className="level-item" />
        </div>
        {transitions.map(({ item, key, props }) => {
          return item && <Cart key={key} style={props} />
        })}
      </header>
      <Loader />
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: "",
}

export default Header

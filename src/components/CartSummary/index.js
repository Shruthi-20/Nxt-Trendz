// Write your code here
import {useState} from 'react'
import Popup from 'reactjs-popup'
import {IoMdClose} from 'react-icons/io'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [selectedPayment, setSelectedPayment] = useState('')
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const handleChange = event => setSelectedPayment(event.target.value)
  const confirmOrder = () => {
    if (selectedPayment === 'cod') {
      setOrderConfirmed(true)
    }
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const totalSum = cartList.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        )

        return (
          <div className="cart-summary-container">
            <h1 className="total-cart-summary">
              Order Total: <span className="total-sum">Rs {totalSum}/-</span>
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>

            <Popup
              modal
              trigger={
                <button type="button" className="checkout-btn">
                  Checkout
                </button>
              }
              onClose={() => {
                setSelectedPayment('')
                setOrderConfirmed(false)
              }}
            >
              {close => (
                <div className="popup-container">
                  <button type="button" className="close-btn" onClick={close}>
                    <IoMdClose />
                  </button>
                  <h1 className="popup-heading">Select Payment Method</h1>

                  <form className="payment-form">
                    <label>
                      <input type="radio" value="card" disabled />
                      Card
                    </label>
                    <label>
                      <input type="radio" value="netbanking" disabled />
                      Net Banking
                    </label>
                    <label>
                      <input type="radio" value="upi" disabled />
                      UPI
                    </label>
                    <label>
                      <input type="radio" value="wallet" disabled />
                      Wallet
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="cod"
                        checked={selectedPayment === 'cod'}
                        onChange={handleChange}
                      />
                      Cash on Delivery
                    </label>
                  </form>

                  <div className="order-summary">
                    <p className="total-items">
                      Total Items: {cartList.length}
                    </p>
                    <p className="total-amount">
                      Total Amount: Rs {totalSum}/-
                    </p>
                  </div>

                  <button
                    type="button"
                    className="confirm-btn"
                    disabled={selectedPayment !== 'cod'}
                    onClick={confirmOrder}
                  >
                    Confirm Order
                  </button>

                  {orderConfirmed && (
                    <p className="success-msg">
                      Your order has been placed successfully
                    </p>
                  )}
                </div>
              )}
            </Popup>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary

// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
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
          <button type="button" className="checkout-btn">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary

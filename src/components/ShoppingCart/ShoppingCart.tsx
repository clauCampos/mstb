import { useShoppingCart } from './hooks/useShoppingCart'
import type { CartItem } from '../../context/types/CartContextTypes'
import './styles/ShoppingCartStyles.scss'

export default function ShoppingCart() {
  const {
    cart,
    totalPrice,
    handleRemove,
    handleContinueShopping,
    showPayAlert,
    AlertModal,
  } = useShoppingCart()

  const longCart = cart.length > 2

  function handleRemoveClick(idx: number): () => void {
    return () => handleRemove(idx)
  }

  function handlePay(): () => void {
    return () => showPayAlert()
  }

  return (
    <>
      <div
        className={`${longCart ? 'cart-main-container-long' : 'cart-main-container'}`}
      >
        <div
          className={`${longCart ? 'cart-container-long' : 'cart-container'}`}
        >
          <h2
            data-testid='cart-title'
            className={`${longCart ? 'cart-title-long' : 'cart-title'}`}
          >
            Cart ({cart.length})
          </h2>

          <ul
            data-testid='cart-list'
            className={`${longCart ? 'cart-list-long' : 'cart-list'}`}
          >
            {cart.map((item: CartItem, idx: number) => (
              <li data-testid='cart-item' key={idx} className='cart-item'>
                <img
                  className='cart-item-img'
                  src={item.imageUrl}
                  alt={`${item.brand} ${item.name}`}
                />

                <div
                  className={`${longCart ? 'cart-item-info-long' : 'cart-item-info'}`}
                >
                  <div className='cart-info-wrapper'>
                    <div className='cart-info-name-price-wrapper'>
                      <h3
                        data-testid='cart-info-title'
                        className='cart-info-title'
                      >
                        {item.brand} {item.id}
                      </h3>

                      <p className='cart-info-text '>
                        {item.storageOptions.capacity} | {item.colorOptions}
                      </p>
                    </div>

                    <p className='cart-info-text'>{item.basePrice} Eur</p>
                  </div>

                  <button
                    className='cart-remove-btn'
                    data-testid={`cart-remove-btn-${idx}`}
                    onClick={handleRemoveClick(idx)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`${longCart ? 'cart-footer-wrapper-long' : 'cart-footer-wrapper'}`}
        >
          {cart.length > 0 && (
            <div className='cart-total-wrapper-wide'>
              <p>Total</p>
              <p data-testid='total-price'>{totalPrice} Eur</p>
            </div>
          )}

          <div
            className={`${longCart ? 'cart-btns-wrapper-long' : 'cart-btns-wrapper'}`}
          >
            <button
              data-testid='continue-shopping-btn'
              className={`${longCart ? 'cart-continue-btn-long' : 'cart-continue-btn'}`}
              onClick={handleContinueShopping}
            >
              Continue shopping
            </button>

            {cart.length > 0 && (
              <div className='cart-total-narrow-pay'>
                <div className='cart-total-wrapper-narrow'>
                  <p>Total</p>
                  <p>{totalPrice} Eur</p>
                </div>

                <button className='cart-pay-btn' onClick={handlePay()}>
                  Pay
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {AlertModal}
    </>
  )
}

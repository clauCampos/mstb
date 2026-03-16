import { useCartContext } from '../../../context/CartContext'
import { NavLink } from 'react-router-dom'
import LogoIcon from '../Icons/LogoIcon'
import BasketEmptyIcon from '../Icons/BasketEmptyIcon'
import BasketFullIcon from '../Icons/BasketFullIcon'
import './styles/HeaderStyles.scss'

export default function AppHeader() {
  const { cart } = useCartContext()

  return (
    <header data-testid='app-header' className='header-container'>
      <h1>
        <NavLink to='/products' data-testid='logo-link'>
          <LogoIcon title='Logo link' className='logo-icon' />
        </NavLink>
      </h1>

      <NavLink to='/cart' className='cart-counter-link' data-testid='cart-link'>
        {cart.length === 0 ? (
          <BasketEmptyIcon className='basket-icon' />
        ) : (
          <BasketFullIcon className='basket-icon' />
        )}

        <p data-testid='cart-count'>{cart.length}</p>
      </NavLink>
    </header>
  )
}

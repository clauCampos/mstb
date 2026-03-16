import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartContext } from '../../src/context/CartContext'
import type {
  CartContextTypes,
  CartItem,
} from '../../src/context/types/CartContextTypes'
import AppHeader from '../../src/components/Ui/Layout/AppHeader'

const renderWithCart = (cart: CartItem[]) => {
  const value: CartContextTypes = {
    cart,
    addToCart: () => {},
    removeFromCart: () => {},
  }
  return render(
    <MemoryRouter>
      <CartContext.Provider value={value}>
        <AppHeader />
      </CartContext.Provider>
    </MemoryRouter>
  )
}

describe('AppHeader', () => {
  it('renders logo link and cart link', () => {
    renderWithCart([])
    expect(screen.getByTestId('logo-link')).toBeInTheDocument()
    expect(screen.getByTestId('cart-link')).toBeInTheDocument()
  })

  it('shows empty cart icon when cart is empty', () => {
    renderWithCart([])
    expect(screen.getByTestId('Basket empty icon')).toBeInTheDocument()
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0')
  })

  it('shows full cart icon and correct count when cart has items', () => {
    const cart = [
      {
        id: '1',
        brand: 'A',
        name: 'X',
        colorOptions: 'Red',
        storageOptions: { capacity: '64GB', price: 100 },
        basePrice: 100,
        imageUrl: '/img1.jpg',
      },
      {
        id: '2',
        brand: 'B',
        name: 'Y',
        colorOptions: 'Blue',
        storageOptions: { capacity: '128GB', price: 200 },
        basePrice: 200,
        imageUrl: '/img2.jpg',
      },
    ]
    renderWithCart(cart)
    expect(screen.getByTestId('Basket full icon')).toBeInTheDocument()
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
  })
})

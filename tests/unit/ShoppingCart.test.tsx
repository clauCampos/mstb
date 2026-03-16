import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CartContext } from '../../src/context/CartContext'
import type {
  CartContextTypes,
  CartItem,
} from '../../src/context/types/CartContextTypes'
import ShoppingCart from '../../src/components/ShoppingCart/ShoppingCart'

const mockRemoveFromCart = vi.fn()
const mockNavigate = vi.fn()
const mockShowModal = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return { ...actual, useNavigate: () => mockNavigate }
})

vi.mock('../../src/components/Shared/Modal/hooks/useAlertModal', () => ({
  useAlertModal: () => ({
    showModal: mockShowModal,
    AlertModal: <div data-testid='mock-alert-modal'>AlertModal</div>,
  }),
}))

describe('ShoppingCart', () => {
  const baseCart: CartItem[] = [
    {
      id: '1',
      brand: 'BrandA',
      name: 'PhoneA',
      colorOptions: 'Red',
      storageOptions: { capacity: '64GB', price: 100 },
      basePrice: 100,
      imageUrl: '/img1.jpg',
    },
    {
      id: '2',
      brand: 'BrandB',
      name: 'PhoneB',
      colorOptions: 'Blue',
      storageOptions: { capacity: '128GB', price: 200 },
      basePrice: 200,
      imageUrl: '/img2.jpg',
    },
  ]

  function renderWithCart(cart: CartItem[]) {
    const value: CartContextTypes = {
      cart,
      addToCart: vi.fn(),
      removeFromCart: mockRemoveFromCart,
    }
    return render(
      <CartContext.Provider value={value}>
        <ShoppingCart />
      </CartContext.Provider>
    )
  }

  beforeEach(() => {
    mockRemoveFromCart.mockClear()
    mockNavigate.mockClear()
    mockShowModal.mockClear()
  })

  it('renders the cart title with the correct item count', () => {
    renderWithCart(baseCart)
    expect(screen.getByTestId('cart-title')).toHaveTextContent('Cart (2)')
  })

  it('renders a list of cart items with correct details', () => {
    renderWithCart(baseCart)
    const items = screen.getAllByTestId('cart-item')
    expect(items).toHaveLength(2)
    expect(screen.getByAltText('BrandA PhoneA')).toBeInTheDocument()
    expect(screen.getByAltText('BrandB PhoneB')).toBeInTheDocument()
    expect(screen.getByText('64GB | Red')).toBeInTheDocument()
    expect(screen.getByText('128GB | Blue')).toBeInTheDocument()
    expect(screen.getByText('100 Eur')).toBeInTheDocument()
    expect(screen.getByText('200 Eur')).toBeInTheDocument()
  })

  it('"Remove" button removes the correct item from the cart', () => {
    renderWithCart(baseCart)
    const removeBtn = screen.getByTestId('cart-remove-btn-1')
    fireEvent.click(removeBtn)
    expect(mockRemoveFromCart).toHaveBeenCalledWith(1)
  })

  it('"Continue shopping" button navigates to the products page', () => {
    renderWithCart(baseCart)
    const continueBtn = screen.getByTestId('continue-shopping-btn')
    fireEvent.click(continueBtn)
    expect(mockNavigate).toHaveBeenCalledWith('/products')
  })

  it('"Pay" button triggers the alert modal', () => {
    renderWithCart(baseCart)
    const payBtn = screen.getByText('Pay')
    fireEvent.click(payBtn)
    expect(mockShowModal).toHaveBeenCalledWith(
      'Payment feature not implemented yet!'
    )
    expect(screen.getByTestId('mock-alert-modal')).toBeInTheDocument()
  })

  it('displays the correct total price', () => {
    renderWithCart(baseCart)
    expect(screen.getByTestId('total-price')).toHaveTextContent('300 Eur')
  })

  it('handles empty cart UI state', () => {
    renderWithCart([])
    expect(screen.getByTestId('cart-title')).toHaveTextContent('Cart (0)')
    expect(screen.queryByTestId('cart-item')).not.toBeInTheDocument()
    expect(screen.queryByText('Pay')).not.toBeInTheDocument()
    expect(screen.queryByTestId('total-price')).not.toBeInTheDocument()
  })

  it('handles long cart (more than 2 items) UI state', () => {
    const longCart = [
      ...baseCart,
      {
        id: '3',
        brand: 'BrandC',
        name: 'PhoneC',
        colorOptions: 'Green',
        storageOptions: { capacity: '256GB', price: 300 },
        basePrice: 300,
        imageUrl: '/img3.jpg',
      },
    ]
    renderWithCart(longCart)
    expect(screen.getByTestId('cart-title').className).toContain(
      'cart-title-long'
    )
    expect(screen.getAllByTestId('cart-item')).toHaveLength(3)
  })
})

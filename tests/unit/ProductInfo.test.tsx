import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { CartProvider } from '../../src/context/CartContext'
import type { ProductDetailContextType } from '../../src/context/types/ProductDetailContextTypes'
import ProductDetailContext from '../../src/context/ProductDetailContext'
import ProductInfo from '../../src/components/ProductInfo/ProductInfo'

const mockAddToCart = vi.fn()

vi.mock('../../src/context/CartContext', async () => {
  const actual = await vi.importActual<
    typeof import('../../src/context/CartContext')
  >('../../src/context/CartContext')
  return {
    ...actual,
    useCartContext: () => ({
      cart: [],
      addToCart: mockAddToCart,
      removeFromCart: vi.fn(),
    }),
  }
})

const baseProduct = {
  id: '1',
  brand: 'TestBrand',
  name: 'Test Product',
  description: 'A test product',
  basePrice: 100,
  rating: 4.5,
  specs: {
    screen: '6.1-inch',
    resolution: '1170x2532',
    processor: 'A14 Bionic',
    mainCamera: '12MP',
    selfieCamera: '12MP',
    battery: '2815mAh',
    os: 'iOS',
    screenRefreshRate: '60Hz',
  },
  colorOptions: [
    { name: 'Red', hexCode: '#ff0000', imageUrl: '/red.jpg' },
    { name: 'Blue', hexCode: '#0000ff', imageUrl: '/blue.jpg' },
  ],
  storageOptions: [
    { capacity: '64GB', price: 100 },
    { capacity: '128GB', price: 150 },
  ],
  similarProducts: [],
}

beforeEach(() => {
  vi.resetModules()
  vi.clearAllMocks()
})

afterEach(() => {
  vi.resetModules()
})

describe('ProductInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  function renderWithProviders(
    ui: React.ReactElement,
    contextValue?: Partial<ProductDetailContextType>
  ) {
    return render(
      <MemoryRouter>
        <CartProvider>
          <ProductDetailContext.Provider
            value={contextValue as ProductDetailContextType}
          >
            {ui}
          </ProductDetailContext.Provider>
        </CartProvider>
      </MemoryRouter>
    )
  }

  it('displays loading state', () => {
    renderWithProviders(<ProductInfo />, { hasFetched: false })
    expect(screen.queryByTestId('product-info-title')).not.toBeInTheDocument()
  })

  it('displays error state', () => {
    renderWithProviders(<ProductInfo />, {
      error: 'Error occurred',
      hasFetched: true,
    })
    expect(screen.getByText(/error/i)).toBeInTheDocument()
  })

  it('displays not found state', () => {
    renderWithProviders(<ProductInfo />, {
      product: null,
      hasFetched: true,
      error: null,
    })
    expect(screen.getByText(/not found|no product/i)).toBeInTheDocument()
  })

  it('renders product image, name, price, and specifications', () => {
    renderWithProviders(<ProductInfo />, {
      product: baseProduct,
      hasFetched: true,
      error: null,
      selectedColor: 'Red',
      selectedStorage: { capacity: '64GB', price: 100 },
      setSelectedColor: vi.fn(),
      setSelectedStorage: vi.fn(),
    })
    expect(screen.getByTestId('product-info-image')).toBeInTheDocument()
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText(/100\s*eur/i)).toBeInTheDocument()
    expect(screen.getByText('TestBrand')).toBeInTheDocument()
    expect(screen.getByText('A test product')).toBeInTheDocument()
  })

  it('renders storage and color options', () => {
    renderWithProviders(<ProductInfo />, {
      product: baseProduct,
      hasFetched: true,
      error: null,
      selectedColor: 'Red',
      selectedStorage: { capacity: '64GB', price: 100 },
      setSelectedColor: vi.fn(),
      setSelectedStorage: vi.fn(),
    })
    expect(screen.getByText('64GB')).toBeInTheDocument()
    expect(screen.getByText('128GB')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Red' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Blue' })).toBeInTheDocument()
  })

  it('handles color and storage selection logic', () => {
    const setSelectedColor = vi.fn()
    const setSelectedStorage = vi.fn()
    renderWithProviders(<ProductInfo />, {
      product: {
        ...baseProduct,
        specs: baseProduct.specs,
        storageOptions: [
          { capacity: '64GB', price: 100 },
          { capacity: '128GB', price: 150 },
        ],
        colorOptions: [
          { name: 'Red', hexCode: '#ff0000', imageUrl: '/red.jpg' },
          { name: 'Blue', hexCode: '#0000ff', imageUrl: '/blue.jpg' },
        ],
        similarProducts: [],
      },
      hasFetched: true,
      error: null,
      selectedColor: 'Red',
      selectedStorage: { capacity: '64GB', price: 100 },
      setSelectedColor,
      setSelectedStorage,
    })
    const blueBtn = screen.getByRole('button', { name: 'Blue' })
    fireEvent.click(blueBtn)
    expect(setSelectedColor).toHaveBeenCalledWith('Blue')
    const storageOptions = screen.getAllByTestId('storage-option')
    fireEvent.click(storageOptions[1])
    expect(setSelectedStorage).toHaveBeenCalled()
  })

  it('enables/disables Add to cart button and triggers handler', () => {
    renderWithProviders(<ProductInfo />, {
      product: {
        ...baseProduct,
        specs: baseProduct.specs,
        storageOptions: [
          { capacity: '64GB', price: 100 },
          { capacity: '128GB', price: 150 },
        ],
        colorOptions: [
          { name: 'Red', hexCode: '#ff0000', imageUrl: '/red.jpg' },
          { name: 'Blue', hexCode: '#0000ff', imageUrl: '/blue.jpg' },
        ],
        similarProducts: [],
      },
      hasFetched: true,
      error: null,
      selectedColor: '',
      selectedStorage: null,
      setSelectedColor: vi.fn(),
      setSelectedStorage: vi.fn(),
    })
    const buttons = screen.getAllByTestId('add-to-cart-btn')
    expect(buttons[0]).toBeDisabled()

    renderWithProviders(<ProductInfo />, {
      product: {
        ...baseProduct,
        specs: baseProduct.specs,
        storageOptions: [
          { capacity: '64GB', price: 100 },
          { capacity: '128GB', price: 150 },
        ],
        colorOptions: [
          { name: 'Red', hexCode: '#ff0000', imageUrl: '/red.jpg' },
          { name: 'Blue', hexCode: '#0000ff', imageUrl: '/blue.jpg' },
        ],
        similarProducts: [],
      },
      hasFetched: true,
      error: null,
      selectedColor: 'Red',
      selectedStorage: { capacity: '64GB', price: 100 },
      setSelectedColor: vi.fn(),
      setSelectedStorage: vi.fn(),
    })
    const enabledButtons = screen.getAllByTestId('add-to-cart-btn')
    expect(enabledButtons[1]).toBeEnabled()
    fireEvent.click(enabledButtons[1])
    expect(mockAddToCart).toHaveBeenCalled()
  })
})

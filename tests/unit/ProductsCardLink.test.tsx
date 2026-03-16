import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductsCardLink from '../../src/components/Shared/ProductsCardLink/ProductsCardLink'

describe('ProductsCardLink', () => {
  const product = {
    id: '1',
    imageUrl: 'https://example.com/image.jpg',
    name: 'Test Product',
    brand: 'TestBrand',
    basePrice: 123,
  }

  beforeEach(() => {
    localStorage.clear()
  })

  it('renders product info correctly', () => {
    render(
      <MemoryRouter>
        <ProductsCardLink {...product} />
      </MemoryRouter>
    )
    expect(screen.getByTestId('product-card-link')).toBeInTheDocument()
    expect(screen.getByTestId('product-card-image')).toHaveAttribute(
      'src',
      product.imageUrl
    )
    expect(screen.getByTestId('product-card-brand')).toHaveTextContent(
      product.brand
    )
    expect(screen.getByTestId('product-card-name')).toHaveTextContent(
      product.name
    )
    expect(screen.getByTestId('product-card-price')).toHaveTextContent(
      '123 eur'
    )
  })

  it('navigates and triggers correct action on click', () => {
    render(
      <MemoryRouter>
        <ProductsCardLink {...product} />
      </MemoryRouter>
    )
    const card = screen.getByTestId('product-card-link')
    fireEvent.click(card)
    expect(localStorage.getItem('selectedProductId')).toBe('1')
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ProductWithColors } from '../../src/types/ProductWithColors'

vi.mock('../../src/components/ProductsList/SearchBar', () => ({
  default: () => <div data-testid='search-bar' />,
}))

vi.mock('../../src/components/ProductsList/ResultsFilterBar', () => ({
  default: () => <div data-testid='filter-bar' />,
}))

vi.mock(
  '../../src/components/Shared/ProductsCardLink/ProductsCardLink',
  () => ({
    default: (props: Partial<ProductWithColors>) => (
      <div data-testid='product-card' {...props} />
    ),
  })
)

const mockProducts = [
  { id: '1', name: 'Product 1' },
  { id: '2', name: 'Product 2' },
]

describe('ProductsList', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('renders the search bar, filter bar, and product list', async () => {
    vi.doMock('../../src/context/ProductsContext', () => ({
      useProductsContext: () => ({
        filteredProducts: mockProducts,
        error: null,
      }),
    }))
    const { default: ProductsList } =
      await import('../../src/components/ProductsList/ProductsList')
    render(<ProductsList />)
    expect(screen.getByTestId('search-bar')).toBeInTheDocument()
    expect(screen.getByTestId('filter-bar')).toBeInTheDocument()
    expect(screen.getAllByTestId('product-card').length).toBe(2)
  })

  it('displays error message if context has an error', async () => {
    vi.doMock('../../src/context/ProductsContext', () => ({
      useProductsContext: () => ({
        filteredProducts: [],
        error: 'Something went wrong',
      }),
    }))
    const { default: ProductsList } =
      await import('../../src/components/ProductsList/ProductsList')
    render(<ProductsList />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders the correct number of product cards based on filtered products', async () => {
    vi.doMock('../../src/context/ProductsContext', () => ({
      useProductsContext: () => ({
        filteredProducts: mockProducts,
        error: null,
      }),
    }))

    const { default: ProductsList } =
      await import('../../src/components/ProductsList/ProductsList')
    render(<ProductsList />)
    expect(screen.getAllByTestId('product-card').length).toBe(2)
  })
})

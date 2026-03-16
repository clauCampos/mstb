import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import StorageOptionsList from '../../src/components/Shared/StorageOptionsList/StorageOptionsList'
import ProductDetailContext from '../../src/context/ProductDetailContext'

const mockSetSelectedStorage = vi.fn()

const product = {
  id: '1',
  brand: 'Brand',
  name: 'Product',
  description: 'desc',
  basePrice: 100,
  rating: 4.5,
  specs: {
    screen: '',
    resolution: '',
    processor: '',
    mainCamera: '',
    selfieCamera: '',
    battery: '',
    os: '',
    screenRefreshRate: '',
  },
  colorOptions: [],
  storageOptions: [
    { capacity: '64GB', price: 100 },
    { capacity: '128GB', price: 150 },
  ],
  similarProducts: [],
}

describe('StorageOptionsList', () => {
  beforeEach(() => {
    mockSetSelectedStorage.mockClear()
  })

  function renderWithContext(
    selectedStorage: { capacity: string; price: number } | null = null
  ) {
    return render(
      <ProductDetailContext.Provider
        value={{
          product,
          selectedStorage,
          setSelectedStorage: mockSetSelectedStorage,
          error: null,
          hasFetched: true,
          fetchProductDetail: vi.fn().mockResolvedValue(undefined),
          selectedColor: null,
          setSelectedColor: vi.fn(),
        }}
      >
        <StorageOptionsList />
      </ProductDetailContext.Provider>
    )
  }

  it('renders available storage options', () => {
    renderWithContext()
    const options = screen.getAllByTestId('storage-option')
    expect(options).toHaveLength(2)
    expect(screen.getByText('64GB')).toBeInTheDocument()
    expect(screen.getByText('128GB')).toBeInTheDocument()
  })

  it('handles selection and highlights the selected option', () => {
    renderWithContext({ capacity: '128GB', price: 150 })
    const options = screen.getAllByTestId('storage-option')
    expect(options[1].className).toContain('storage-options-item-selected')
    fireEvent.click(options[0])
    expect(mockSetSelectedStorage).toHaveBeenCalledWith({
      capacity: '64GB',
      price: 100,
    })
  })
})

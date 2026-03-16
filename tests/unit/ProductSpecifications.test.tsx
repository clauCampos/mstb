import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductSpecifications from '../../src/components/ProductInfo/ProductSpecifications'
import ProductDetailContext from '../../src/context/ProductDetailContext'

const product = {
  id: '1',
  brand: 'BrandX',
  name: 'SuperPhone',
  description: 'A great phone',
  basePrice: 999,
  rating: 4.8,
  specs: {
    screen: '6.5-inch OLED',
    resolution: '2400x1080',
    processor: 'Snapdragon 888',
    mainCamera: '108MP',
    selfieCamera: '32MP',
    battery: '5000mAh',
    os: 'Android 12',
    screenRefreshRate: '120Hz',
  },
  colorOptions: [],
  storageOptions: [],
  similarProducts: [],
}

describe('ProductSpecifications', () => {
  function renderWithContext(productValue: typeof product | null) {
    return render(
      <ProductDetailContext.Provider
        value={{
          product: productValue,
          error: null,
          fetchProductDetail: async () => {},
          selectedColor: null,
          setSelectedColor: () => {},
          selectedStorage: null,
          setSelectedStorage: () => {},
          hasFetched: true,
        }}
      >
        <ProductSpecifications />
      </ProductDetailContext.Provider>
    )
  }

  it('displays product specifications', () => {
    renderWithContext(product)
    expect(screen.getByTestId('specs-item-brand-value')).toHaveTextContent(
      'BrandX'
    )
    expect(screen.getByTestId('specs-item-name-value')).toHaveTextContent(
      'SuperPhone'
    )
    expect(
      screen.getByTestId('specs-item-description-value')
    ).toHaveTextContent('A great phone')
    expect(screen.getByTestId('specs-item-screen-value')).toHaveTextContent(
      '6.5-inch OLED'
    )
    expect(screen.getByTestId('specs-item-resolution-value')).toHaveTextContent(
      '2400x1080'
    )
    expect(screen.getByTestId('specs-item-processor-value')).toHaveTextContent(
      'Snapdragon 888'
    )
    expect(screen.getByTestId('specs-item-camera-value')).toHaveTextContent(
      '108MP'
    )
    expect(
      screen.getByTestId('specs-item-selfieCamera-value')
    ).toHaveTextContent('32MP')
    expect(screen.getByTestId('specs-item-battery-value')).toHaveTextContent(
      '5000mAh'
    )
    expect(screen.getByTestId('specs-item-os-value')).toHaveTextContent(
      'Android 12'
    )
    expect(
      screen.getByTestId('specs-item-screenRefreshRate-value')
    ).toHaveTextContent('120Hz')
  })

  it('renders nothing if no product', () => {
    const { container } = renderWithContext(null)
    expect(container).toBeEmptyDOMElement()
  })
})

import React from 'react'
import { useProductInfo } from './hooks/useProductInfo'
import DetailsNavigation from './DetailsNavigation'
import StorageOptionsList from '../Shared/StorageOptionsList/StorageOptionsList'
import ColorOptionsListItem from '../Shared/ColorOptionsListItem/ColorOptionsListItem'
import ProductSpecifications from './ProductSpecifications'
import ProductsCardLink from '../Shared/ProductsCardLink/ProductsCardLink'
import './styles/ProductInfoStyles.scss'

export default function ProductInfo() {
  const {
    product,
    error,
    selectedColor,
    selectedStorage,
    hasFetched,
    hoveredColor,
    productImageUrl,
    handleAddToCart,
    getColorButtonProps,
  } = useProductInfo()

  if (error) return <p className='error-text'>{error}</p>

  if (hasFetched && !product)
    return <p className='not-found-text'>Product not found</p>

  if (!product) return null

  return (
    <div>
      <DetailsNavigation />

      <div className='details-container'>
        <div className='details-info-container'>
          <img
            src={productImageUrl}
            alt=''
            data-testid='product-info-image'
            className='info-img'
            fetchPriority='high'
          />

          <div className='info-container'>
            <div className='info-name-price-wrapper'>
              <h2 data-testid='product-info-title' className='info-name'>
                {product.brand} {product.name}
              </h2>

              <p data-testid='product-info-price' className='info-price'>
                {product.basePrice} eur
              </p>
            </div>

            <div className='storage-options'>
              <p className='storage-options-title'>
                Storage ¿how much space do you need?
              </p>

              <StorageOptionsList />
            </div>

            <div className='color-options'>
              <p className='color-options-title'>Color. Pick your favorite.</p>

              <div className='color-list-btn-container'>
                <ul data-testid='color-options-list' className='colors-list'>
                  {product.colorOptions.map((colorOption) => (
                    <React.Fragment key={colorOption.name}>
                      <ColorOptionsListItem
                        colorOption={colorOption}
                        getColorButtonProps={getColorButtonProps}
                      />
                    </React.Fragment>
                  ))}
                </ul>

                <p data-testid='color-name' className='color-name'>
                  {hoveredColor ||
                    selectedColor ||
                    product.colorOptions[0]?.name}
                </p>
              </div>
            </div>

            <button
              className='add-to-cart-btn'
              disabled={!selectedColor || !selectedStorage}
              onClick={handleAddToCart}
              aria-label='Add product to cart'
              data-testid='add-to-cart-btn'
              role='button'
            >
              Añadir
            </button>
          </div>
        </div>

        <div className='details-specs-container'>
          <h3 className='details-specs-title'>Specifications</h3>

          <ProductSpecifications />
        </div>

        <div className='details-similar-items-container'>
          <h3 className='details-similar-items-title'>Similar items</h3>

          <div className='similar-items-container'>
            <ul data-testid='similar-items-list' className='similar-items-list'>
              {product.similarProducts.map((similarProduct, index) => (
                <li
                  key={`${similarProduct.id}-${index}`}
                  className='similar-items-list-item'
                >
                  <ProductsCardLink {...similarProduct} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

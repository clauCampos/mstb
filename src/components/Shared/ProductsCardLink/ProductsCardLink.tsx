import React from 'react'
import { Link } from 'react-router-dom'
import type { ProductWithColors } from '../../../types/ProductWithColors'
import './styles/ProductsCardLinkStyles.scss'

const ProductsCardLink = React.memo(function ProductsCardLink({
  id,
  imageUrl,
  name,
  brand,
  basePrice,
}: ProductWithColors) {
  function handleCardClick() {
    localStorage.setItem('selectedProductId', id)
  }

  return (
    <Link
      to={`/products/${id}`}
      className='product-card'
      onClick={handleCardClick}
      data-testid='product-card-link'
    >
      <div className='product-card-img-wrapper'>
        <img
          src={
            imageUrl.startsWith('http://')
              ? imageUrl.replace('http://', 'https://')
              : imageUrl
          }
          data-testid='product-card-image'
          alt={`${brand} ${name}`}
          className='product-card-img'
        />
      </div>

      <div className='product-card-info'>
        <p data-testid='product-card-brand' className='product-card-brand'>
          {brand}
        </p>

        <div className='product-card-details'>
          <p data-testid='product-card-name' className='product-card-name'>
            {name}
          </p>
          <p data-testid='product-card-price' className='product-card-price'>
            {basePrice} eur
          </p>
        </div>
      </div>
    </Link>
  )
})

export default ProductsCardLink

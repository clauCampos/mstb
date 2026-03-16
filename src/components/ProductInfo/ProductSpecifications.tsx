import { useProductDetailContext } from '../../context/ProductDetailContext'
import './styles/ProductSpecsStyles.scss'

export default function ProductSpecifications() {
  const { product } = useProductDetailContext()
  if (!product) return null

  return (
    <ul data-testid='product-specs-list' className='specs-list'>
      <li className='specs-item first-specs-item'>
        <p data-testid='specs-item-brand-title' className='specs-item-title'>
          Brand
        </p>
        <p data-testid='specs-item-brand-value' className='specs-item-value'>
          {product.brand}
        </p>
      </li>

      <li className='specs-item'>
        <p data-testid='specs-item-name-title' className='specs-item-title'>
          Name
        </p>
        <p data-testid='specs-item-name-value' className='specs-item-value'>
          {product.name}
        </p>
      </li>

      <li className='specs-item'>
        <p
          data-testid='specs-item-description-title'
          className='specs-item-title'
        >
          Description
        </p>
        <p
          data-testid='specs-item-description-value'
          className='specs-item-value'
        >
          {product.description}
        </p>
      </li>

      <li className='specs-item'>
        <p data-testid='specs-item-screen-title' className='specs-item-title'>
          Screen
        </p>
        <p data-testid='specs-item-screen-value' className='specs-item-value'>
          {product.specs.screen}
        </p>
      </li>

      <li className='specs-item'>
        <p
          data-testid='specs-item-resolution-title'
          className='specs-item-title'
        >
          Resolution
        </p>
        <p
          data-testid='specs-item-resolution-value'
          className='specs-item-value'
        >
          {product.specs.resolution}
        </p>
      </li>

      <li className='specs-item'>
        <p
          data-testid='specs-item-processor-title'
          className='specs-item-title'
        >
          Processor
        </p>
        <p
          data-testid='specs-item-processor-value'
          className='specs-item-value'
        >
          {product.specs.processor}
        </p>
      </li>

      <li className='specs-item'>
        <p data-testid='specs-item-camera-title' className='specs-item-title'>
          Main camera
        </p>
        <p data-testid='specs-item-camera-value' className='specs-item-value'>
          {product.specs.mainCamera}
        </p>
      </li>

      <li className='specs-item'>
        <p
          data-testid='specs-item-selfieCamera-title'
          className='specs-item-title'
        >
          Selfie camera
        </p>
        <p
          data-testid='specs-item-selfieCamera-value'
          className='specs-item-value'
        >
          {product.specs.selfieCamera}
        </p>
      </li>

      <li className='specs-item'>
        <p data-testid='specs-item-battery-title' className='specs-item-title'>
          Battery
        </p>
        <p data-testid='specs-item-battery-value' className='specs-item-value'>
          {product.specs.battery}
        </p>
      </li>

      <li className='specs-item'>
        <p data-testid='specs-item-os-title' className='specs-item-title'>
          Os
        </p>
        <p data-testid='specs-item-os-value' className='specs-item-value'>
          {product.specs.os}
        </p>
      </li>

      <li className='specs-item'>
        <p
          data-testid='specs-item-screenRefreshRate-title'
          className='specs-item-title'
        >
          Screen refresh rate
        </p>
        <p
          data-testid='specs-item-screenRefreshRate-value'
          className='specs-item-value'
        >
          {product.specs.screenRefreshRate}
        </p>
      </li>
    </ul>
  )
}

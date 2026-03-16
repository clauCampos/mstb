import { useProductDetailContext } from '../../../context/ProductDetailContext'
import { useStorageOptionsList } from './hooks/useStorageOptionsList'
import './styles/StorageOptionsListStyles.scss'

export default function StorageOptionsList() {
  const { product, getOptionClickHandler } = useStorageOptionsList()
  const { selectedStorage } = useProductDetailContext()

  if (!product || !product.storageOptions) return null

  return (
    <ul data-testid='storage-options-list' className='storage-options-list'>
      {product.storageOptions.map((option) => {
        const isSelected =
          selectedStorage && selectedStorage.capacity === option.capacity

        return (
          <li
            key={option.capacity}
            className={
              isSelected
                ? 'storage-options-item-selected'
                : 'storage-options-item'
            }
            onClick={getOptionClickHandler(option)}
            data-testid='storage-option'
            aria-label={`Storage option ${option.capacity}`}
            role='button'
          >
            <button role='button'>{option.capacity}</button>
          </li>
        )
      })}
    </ul>
  )
}

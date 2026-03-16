import { useProductsContext } from '../../context/ProductsContext'
import ProductsCardLink from '../Shared/ProductsCardLink/ProductsCardLink'
import ResultsFiltersBar from './ResultsFilterBar'
import SearchBar from './SearchBar'
import './styles/ProductsListStyles.scss'

export default function ProductsList() {
  const { filteredProducts, error } = useProductsContext()

  if (error) return <p className='error-text'>{error}</p>

  return (
    <div className='products-list-container'>
      <div className='search-filters-wrapper'>
        <SearchBar />
        <ResultsFiltersBar />
      </div>

      <ul className='products-list'>
        {filteredProducts.map((product, index) => (
          <li key={`${product.id}-${index}`} className='products-list-item'>
            <ProductsCardLink {...product} />
          </li>
        ))}
      </ul>
    </div>
  )
}

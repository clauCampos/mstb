import type { ProductTypes } from '../../types/ProductTypes'

export interface ProductsContextTypes {
  products: ProductTypes[]
  inputValue: string
  setInputValue: (value: string) => void
  filteredProducts: ProductTypes[]
  error: string | null
  selectedColor: string | null
  setSelectedColor: (color: string | null) => void
  hasFetched: boolean
}

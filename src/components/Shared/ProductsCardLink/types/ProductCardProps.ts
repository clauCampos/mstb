import type { ProductTypes } from '../../../../types/ProductTypes'

export interface ProductCardProps {
  product: ProductTypes
  onProductClick?: (id: string) => void
}

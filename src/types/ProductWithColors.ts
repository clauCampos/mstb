import type { ColorOption } from './ColorOption'
export interface ProductWithColors {
  id: string
  brand: string
  name: string
  basePrice: number
  imageUrl: string
  colorOptions?: ColorOption[]
}

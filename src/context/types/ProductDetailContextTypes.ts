export interface ProductDetailContextTypes {
  id: string
  brand: string
  name: string
  description: string
  basePrice: number
  rating: number
  specs: {
    screen: string
    resolution: string
    processor: string
    mainCamera: string
    selfieCamera: string
    battery: string
    os: string
    screenRefreshRate: string
  }
  colorOptions: Array<{
    name: string
    hexCode: string
    imageUrl: string
  }>

  storageOptions: Array<{
    capacity: string
    price: number
  }>

  similarProducts: Array<{
    id: string
    brand: string
    name: string
    basePrice: number
    imageUrl: string
  }>
}

export interface ProductDetailContextType {
  product: ProductDetailContextTypes | null
  error: string | null
  fetchProductDetail: (id: string) => Promise<void>
  selectedColor: string | null
  setSelectedColor: (colorName: string | null) => void
  selectedStorage: { capacity: string; price: number } | null
  setSelectedStorage: (
    storageOption: { capacity: string; price: number } | null
  ) => void
  hasFetched: boolean
}

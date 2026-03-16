export interface CartItem {
  id: string
  brand: string
  name: string
  colorOptions: string
  storageOptions: { capacity: string; price: number }
  basePrice: number
  imageUrl: string
}

export interface CartContextTypes {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (index: number) => void
}

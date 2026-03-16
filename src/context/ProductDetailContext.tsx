import {
  useCallback,
  useContext,
  useState,
  createContext,
  type ReactNode,
} from 'react'
import type {
  ProductDetailContextTypes,
  ProductDetailContextType,
} from './types/ProductDetailContextTypes'
import { apiFetch } from '../services/api'

const ProductDetailContext = createContext<
  ProductDetailContextType | undefined
>(undefined)

export const ProductDetailProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [product, setProduct] = useState<ProductDetailContextTypes | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedStorage, setSelectedStorage] = useState<{
    capacity: string
    price: number
  } | null>(null)
  const [hasFetched, setHasFetched] = useState(false)

  const fetchProductDetail = useCallback(async (id: string) => {
    setError(null)
    setHasFetched(false)

    try {
      const data = await apiFetch(`/products/${id}`)
      setHasFetched(true)

      if (data?.error) {
        if (data.status === 401) setError('Invalid API key')
        else if (data.status === 404) setError('Product not found')
        else setError(data.message || 'Unknown error')
        setProduct(null)
        setSelectedColor(null)
        setSelectedStorage(null)
        return
      }
      setProduct(data)
      setSelectedColor(null)
      setSelectedStorage(null)
    } catch (err: unknown) {
      setHasFetched(true)
      let errorMsg = 'Unknown error'
      if (
        err &&
        typeof err === 'object' &&
        'message' in err &&
        typeof (err as { message?: unknown }).message === 'string'
      ) {
        errorMsg = (err as { message: string }).message
      }
      setError(errorMsg)
      setProduct(null)
      setSelectedColor(null)
      setSelectedStorage(null)
    }
  }, [])

  return (
    <ProductDetailContext.Provider
      value={{
        product,
        error,
        selectedColor,
        selectedStorage,
        fetchProductDetail,
        setSelectedColor,
        setSelectedStorage,
        hasFetched,
      }}
    >
      {children}
    </ProductDetailContext.Provider>
  )
}

export const useProductDetailContext = () => {
  const context = useContext(ProductDetailContext)
  if (!context) {
    throw new Error(
      'useProductDetailContext must be used within a ProductDetailProvider'
    )
  }
  return context
}

export default ProductDetailContext

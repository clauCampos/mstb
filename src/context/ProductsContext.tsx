import React, { createContext, useContext, useMemo, useState } from 'react'
import { useEffect } from 'react'
import { apiFetch } from '../services/api'
import type { ProductsContextTypes } from './types/ProductsContextTypes'
import type { ProductWithColors } from '../types/ProductWithColors'
import type { ColorOption } from '../types/ColorOption'

const ProductsContext = createContext<ProductsContextTypes | undefined>(
  undefined
)

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductWithColors[]>([])
  const [error, setError] = useState<string | null>(null)
  const [hasFetched, setHasFetched] = useState(false)

  useEffect(() => {
    apiFetch('/products')
      .then((data) => {
        setHasFetched(true)
        if (data?.error) {
          if (data.status === 401) setError('Invalid API key')
          else setError(data.message || 'Unknown error')
          setProducts([])
          return
        }
        setProducts(data)
      })
      .catch((err) => {
        setHasFetched(true)
        setError(err?.message || 'Unknown error')
        setProducts([])
      })
  }, [])

  const [inputValue, setInputValue] = useState('')
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const filteredProducts = useMemo(() => {
    const value = inputValue.trim().toLowerCase()
    let filtered = products

    if (value) {
      filtered = filtered.filter(
        (product: ProductWithColors) =>
          product.name.toLowerCase().includes(value) ||
          product.brand.toLowerCase().includes(value)
      )
    }

    if (selectedColor) {
      filtered = filtered.filter(
        (product: ProductWithColors) =>
          product.colorOptions &&
          product.colorOptions.some(
            (option: ColorOption) => option.name === selectedColor
          )
      )
    }

    const uniqueFiltered = filtered.filter(
      (product, index, self) =>
        index === self.findIndex((p) => p.id === product.id)
    )
    return uniqueFiltered
  }, [inputValue, products, selectedColor])

  const contextValue = useMemo(
    () => ({
      products,
      inputValue,
      setInputValue,
      filteredProducts,
      error,
      selectedColor,
      setSelectedColor,
      hasFetched,
    }),
    [products, inputValue, filteredProducts, error, selectedColor, hasFetched]
  )

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProductsContext = () => {
  const context = useContext(ProductsContext)
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider')
  }
  return context
}

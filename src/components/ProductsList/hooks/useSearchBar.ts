import React, { useRef, useCallback } from 'react'
import { useProductsContext } from '../../../context/ProductsContext'

export default function useSearchBar() {
  const { inputValue, setInputValue } = useProductsContext()
  const debounceRef = useRef<number | undefined>(undefined)

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }

      debounceRef.current = window.setTimeout(() => {
        setInputValue(value)
      }, 300)
    },
    [setInputValue]
  )

  const handleClearInput = useCallback(() => {
    setInputValue('')
  }, [setInputValue])

  return {
    inputValue,
    setInputValue,
    handleInputChange,
    handleClearInput,
  }
}

import { useCallback } from 'react'
import { useProductDetailContext } from '../../../../context/ProductDetailContext'

export function useStorageOptionsList() {
  const { product, setSelectedStorage } = useProductDetailContext()

  const handleStorageSelection = useCallback(
    (storageOption: { capacity: string; price: number }) => {
      setSelectedStorage(storageOption)
    },
    [setSelectedStorage]
  )

  const getOptionClickHandler = useCallback(
    (option: { capacity: string; price: number }) => () => {
      if (product) handleStorageSelection(option)
    },
    [product, handleStorageSelection]
  )

  return { product, handleStorageSelection, getOptionClickHandler }
}

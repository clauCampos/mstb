import { useEffect, useState, useCallback } from 'react'
import { getSharedColorButtonProps } from '../../Shared/ColorOptionsListItem/types/getSharedColorButtonProps'
import { useNavigate, useParams } from 'react-router-dom'
import { useProductDetailContext } from '../../../context/ProductDetailContext'
import { useCartContext } from '../../../context/CartContext'

export function useProductInfo() {
  const { addToCart } = useCartContext()
  const {
    product,
    error,
    selectedColor,
    selectedStorage,
    hasFetched,
    fetchProductDetail,
    setSelectedColor,
  } = useProductDetailContext()

  const selectedColorObj =
    product?.colorOptions.find((option) => option.name === selectedColor) ||
    product?.colorOptions[0]

  const productImageUrl = selectedColorObj?.imageUrl
    ? selectedColorObj.imageUrl.startsWith('http://')
      ? selectedColorObj.imageUrl.replace('http://', 'https://')
      : selectedColorObj.imageUrl
    : ''

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [hoveredColor, setHoveredColor] = useState<string | null>(null)
  const handleButtonMouseEnter = useCallback((colorName: string) => {
    setHoveredColor(colorName)
  }, [])
  const handleButtonMouseLeave = useCallback(() => {
    setHoveredColor(null)
  }, [])

  useEffect(() => {
    if (id) {
      fetchProductDetail(id)
    }
  }, [id, fetchProductDetail])

  const handleAddToCart = () => {
    if (!product) return

    const colorName = selectedColor || product.colorOptions[0]?.name
    const storageOption = selectedStorage || product.storageOptions[0]
    const colorOptionObj =
      product.colorOptions.find((option) => option.name === colorName) ||
      product.colorOptions[0]
    const imageUrl = colorOptionObj?.imageUrl || ''

    const cartItem = {
      id: product.id,
      brand: product.brand,
      name: product.name,
      colorOptions: colorName,
      storageOptions: storageOption,
      basePrice: product.basePrice,
      imageUrl,
    }

    addToCart(cartItem)
    localStorage.removeItem('selectedProductId')
    navigate('/cart')
  }

  const getColorButtonProps = useCallback(
    (colorOption: { name: string; hexCode: string }) =>
      getSharedColorButtonProps(
        colorOption,
        selectedColor === colorOption.name,
        () => setSelectedColor(colorOption.name),
        () => handleButtonMouseEnter(colorOption.name),
        handleButtonMouseLeave
      ),
    [
      selectedColor,
      setSelectedColor,
      handleButtonMouseEnter,
      handleButtonMouseLeave,
    ]
  )

  return {
    product,
    error,
    hasFetched,
    hoveredColor,
    selectedStorage,
    selectedColor,
    setSelectedColor,
    handleButtonMouseEnter,
    handleButtonMouseLeave,
    handleAddToCart,
    productImageUrl,
    getColorButtonProps,
  }
}

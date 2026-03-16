import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../../../context/CartContext'
import { useAlertModal } from '../../Shared/Modal/hooks/useAlertModal'

export function useShoppingCart() {
  const navigate = useNavigate()
  const { cart, removeFromCart } = useCartContext()
  const { showModal, AlertModal } = useAlertModal()

  const totalPrice = cart.reduce(
    (sum: number, item: { basePrice: number }) => sum + item.basePrice,
    0
  )

  const handleRemove = useCallback(
    (idx: number) => {
      removeFromCart(idx)
    },
    [removeFromCart]
  )

  const handleContinueShopping = useCallback(() => {
    navigate('/products')
  }, [navigate])

  const showPayAlert = useCallback(() => {
    showModal('Payment feature not implemented yet!')
  }, [showModal])

  return {
    cart,
    totalPrice,
    handleRemove,
    handleContinueShopping,
    showPayAlert,
    AlertModal,
  }
}

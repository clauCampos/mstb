import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

export default function useDetailsNavigation() {
  const navigate = useNavigate()

  const handleGoBack = useCallback(() => {
    navigate(-1)
    localStorage.removeItem('selectedProductId')
  }, [navigate])

  return {
    handleGoBack,
  }
}

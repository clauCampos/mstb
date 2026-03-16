import { useState, useCallback } from 'react'
import Modal from '../Modal'

export function useAlertModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  const showModal = useCallback((msg: string) => {
    setMessage(msg)
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setMessage('')
  }, [])

  const AlertModal = isOpen ? (
    <Modal isOpen={true} onClose={handleClose}>
      <p className='color-alert'>{message}</p>
    </Modal>
  ) : null

  return {
    showModal,
    AlertModal,
  }
}

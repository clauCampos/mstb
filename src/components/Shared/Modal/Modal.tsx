import { useModal } from './hooks/useModal'
import type { ModalProps } from './types/ModalTypes'
import CloseIcon from '../../Ui/Icons/CloseIcon'
import './styles/ModalStyles.scss'

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const { handleContentClick } = useModal()

  if (!isOpen) return null

  return (
    <div
      data-testid='modal-overlay'
      className='modal-overlay'
      onClick={onClose}
    >
      <div
        data-testid='modal-content'
        className='modal-content'
        onClick={handleContentClick}
      >
        {children}

        <button
          data-testid='modal-close'
          className='modal-close-btn'
          onClick={onClose}
        >
          <CloseIcon className='modal-close-icon' />
        </button>
      </div>
    </div>
  )
}

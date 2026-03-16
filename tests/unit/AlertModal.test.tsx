import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useAlertModal } from '../../src/components/Shared/Modal/hooks/useAlertModal'

function TestComponent() {
  const { showModal, AlertModal } = useAlertModal()
  React.useEffect(() => {
    showModal('Test alert!')
  }, [showModal])
  return <>{AlertModal}</>
}

describe('AlertModal', () => {
  it('renders and displays the alert when triggered', () => {
    render(<TestComponent />)
    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument()
    expect(screen.getByText('Test alert!')).toBeInTheDocument()
  })
})

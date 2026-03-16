import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import CartPage from '../../src/pages/CartPage'

vi.mock('../../src/components/Ui/Layout/Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='mock-layout'>{children}</div>
  ),
}))

vi.mock('../../src/components/ShoppingCart/ShoppingCart', () => ({
  default: () => <div data-testid='mock-shopping-cart'>ShoppingCart</div>,
}))

describe('CartPage', () => {
  it('renders without crashing', () => {
    render(<CartPage />)
    expect(screen.getByTestId('mock-layout')).toBeInTheDocument()
  })

  it('composes Layout and a container div with the correct class', () => {
    render(<CartPage />)
    const container = screen
      .getByTestId('mock-layout')
      .querySelector('.cart-page-container')
    expect(container).toBeInTheDocument()
  })

  it('renders ShoppingCart inside the layout', () => {
    render(<CartPage />)
    expect(screen.getByTestId('mock-shopping-cart')).toBeInTheDocument()
  })
})

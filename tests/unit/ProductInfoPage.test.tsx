import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductInfoPage from '../../src/pages/ProductInfoPage'

vi.mock('../../src/context/ProductDetailContext', () => ({
  ProductDetailProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='product-detail-provider'>{children}</div>
  ),
}))

vi.mock('../../src/components/Ui/Layout/Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <main role='main' data-testid='layout'>
      {children}
    </main>
  ),
}))

vi.mock('../../src/components/ProductInfo/ProductInfo', () => ({
  default: () => <div data-testid='product-info' />,
}))

describe('ProductDetailPage', () => {
  it('renders without crashing', () => {
    render(<ProductInfoPage />)
  })

  it('composes ProductDetailProvider, Layout, and container div', () => {
    render(<ProductInfoPage />)
    expect(screen.getByTestId('product-detail-provider')).toBeInTheDocument()
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    const container = screen
      .getByRole('main')
      .querySelector('.details-page-container')
    expect(container).toBeInTheDocument()
  })

  it('renders ProductInfo inside the layout', () => {
    render(<ProductInfoPage />)
    expect(screen.getByTestId('product-info')).toBeInTheDocument()
  })
})

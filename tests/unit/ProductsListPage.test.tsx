import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductsListPage from '../../src/pages/ProductsListPage'

vi.mock('../../src/components/Ui/Layout/AppHeader', () => ({
  default: () => <div data-testid='app-header' />,
}))

vi.mock('../../src/context/ProductsContext', () => ({
  ProductsProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='products-provider'>{children}</div>
  ),
}))

vi.mock('../../src/components/ProductsList/ProductsList', () => ({
  default: () => <div data-testid='products-list' />,
}))

vi.mock('../../src/components/Ui/Layout/Layout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <main role='main' data-testid='layout'>
      {children}
    </main>
  ),
}))

describe('ProductsListPage', () => {
  it('renders without errors', () => {
    render(<ProductsListPage />)
  })

  it('composes ProductsProvider, Layout, and ProductsList', () => {
    render(<ProductsListPage />)
    expect(screen.getByTestId('products-provider')).toBeInTheDocument()
    expect(screen.getByTestId('layout')).toBeInTheDocument()
    expect(screen.getByTestId('products-list')).toBeInTheDocument()
  })

  it('has the correct container class', () => {
    render(<ProductsListPage />)
    const container = screen
      .getByRole('main')
      .querySelector('.products-list-page-container')
    expect(container).toBeInTheDocument()
  })
})

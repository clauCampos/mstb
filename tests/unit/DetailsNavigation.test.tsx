import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DetailsNavigation from '../../src/components/ProductInfo/DetailsNavigation'

const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('DetailsNavigation', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
    localStorage.clear()
  })

  it('renders navigation UI (back button and icon)', () => {
    render(
      <MemoryRouter>
        <DetailsNavigation />
      </MemoryRouter>
    )
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
    expect(screen.getByTestId('Back icon')).toBeInTheDocument()
  })

  it('handles navigation actions (go back and clear localStorage)', () => {
    localStorage.setItem('selectedProductId', '123')
    render(
      <MemoryRouter>
        <DetailsNavigation />
      </MemoryRouter>
    )
    const backBtn = screen.getByRole('button', { name: /back/i })
    fireEvent.click(backBtn)
    expect(mockNavigate).toHaveBeenCalledWith(-1)
    expect(localStorage.getItem('selectedProductId')).toBeNull()
  })
})

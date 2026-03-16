import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

let SearchBar: typeof import('../../src/components/ProductsList/SearchBar').default
const setInputValueMock = vi.fn()

describe('SearchBar', () => {
  beforeEach(() => {
    setInputValueMock.mockClear()
    vi.resetModules()
  })

  it('renders input with correct placeholder', async () => {
    vi.doMock('../../src/context/ProductsContext', () => ({
      useProductsContext: () => ({
        inputValue: '',
        setInputValue: setInputValueMock,
      }),
    }))

    SearchBar = (await import('../../src/components/ProductsList/SearchBar'))
      .default
    render(<SearchBar />)
    const input = screen.getByTestId('search-input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Search for a smartphone...')
  })

  it('updates value on user input', async () => {
    vi.doMock('../../src/context/ProductsContext', () => ({
      useProductsContext: () => ({
        inputValue: '',
        setInputValue: setInputValueMock,
      }),
    }))

    SearchBar = (await import('../../src/components/ProductsList/SearchBar'))
      .default
    render(<SearchBar />)
    const input = screen.getByTestId('search-input') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'iPhone' } })
    expect(setInputValueMock).not.toHaveBeenCalled() // debounce, so not called immediately
  })

  it('shows and works the clear button when input is not empty', async () => {
    vi.doMock('../../src/context/ProductsContext', () => ({
      useProductsContext: () => ({
        inputValue: 'test',
        setInputValue: setInputValueMock,
      }),
    }))

    SearchBar = (await import('../../src/components/ProductsList/SearchBar'))
      .default
    render(<SearchBar />)
    const clearBtn = screen.getByTestId('clear-input-button')
    expect(clearBtn).toBeInTheDocument()
    fireEvent.click(clearBtn)
    expect(setInputValueMock).toHaveBeenCalledWith('')
  })

  it('calls the clear handler when the clear button is clicked', async () => {
    vi.doMock('../../src/context/ProductsContext', () => ({
      useProductsContext: () => ({
        inputValue: 'something',
        setInputValue: setInputValueMock,
      }),
    }))

    SearchBar = (await import('../../src/components/ProductsList/SearchBar'))
      .default
    render(<SearchBar />)
    const clearBtn = screen.getByTestId('clear-input-button')
    fireEvent.click(clearBtn)
    expect(setInputValueMock).toHaveBeenCalledWith('')
  })
})

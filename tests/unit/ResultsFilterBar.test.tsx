import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import type { ColorOption } from '../../src/types/ColorOption'

const handleShowFilters = vi.fn()
const handleRemoveFilter = vi.fn()
const getColorButtonProps = vi.fn(() => ({}))
const handleCloseFilterResults = vi.fn()
const showModal = vi.fn()

vi.mock('../../src/context/ProductsContext', () => ({
  useProductsContext: () => ({
    filteredProducts: [{ id: '1' }, { id: '2' }],
    hasFetched: true,
  }),
}))

vi.mock(
  '../../src/components/Shared/ColorOptionsListItem/ColorOptionsListItem',
  () => ({
    __esModule: true,
    default: ({
      colorOption,
      getColorButtonProps,
    }: {
      colorOption: ColorOption
      getColorButtonProps: (arg: ColorOption) => void
    }) => {
      getColorButtonProps(colorOption)
      return <li data-testid='mock-color-option'>ColorOption</li>
    },
  })
)

vi.mock('../../src/components/ProductsList/hooks/useResultsFiltersBar', () => ({
  default: () => ({
    showFilters: false,
    filtersAppied: false,
    colorOptions: [{ name: 'Red', hexCode: '#ff0000' }],
    selectedColors: [],
    hoveredColor: null,
    handleShowFilters,
    handleCloseFilterResults,
    handleRemoveFilter,
    getColorButtonProps,
  }),
}))

vi.mock('../../src/components/Shared/Modal/hooks/useAlertModal', () => ({
  useAlertModal: () => ({
    showModal,
    AlertModal: <div data-testid='alert-modal' />,
  }),
}))

const ResultsFiltersBar = (
  await import('../../src/components/ProductsList/ResultsFilterBar')
).default

describe('ResultsFiltersBar', () => {
  beforeEach(() => {
    handleShowFilters.mockClear()
    handleRemoveFilter.mockClear()
    getColorButtonProps.mockClear()
    handleCloseFilterResults.mockClear()
    showModal.mockClear()
  })

  it('renders results count when filters are hidden', () => {
    render(<ResultsFiltersBar />)
    expect(screen.getByTestId('results-count')).toHaveTextContent('2 results')
  })

  it('shows filter button and handles its click', () => {
    render(<ResultsFiltersBar />)
    const filterBtn = screen.getByTestId('filter-button')
    expect(filterBtn).toBeInTheDocument()
    fireEvent.click(filterBtn)
    expect(handleShowFilters).toHaveBeenCalled()
  })

  it('renders color options and handles filter application/removal', async () => {
    vi.doMock(
      '../../src/components/ProductsList/hooks/useResultsFiltersBar',
      () => ({
        default: () => ({
          showFilters: true,
          filtersAppied: false,
          colorOptions: [{ name: 'Red', hexCode: '#ff0000' }],
          selectedColors: [],
          hoveredColor: null,
          handleShowFilters,
          handleCloseFilterResults,
          handleRemoveFilter,
          getColorButtonProps,
        }),
      })
    )

    vi.resetModules()
    const DynamicResultsFiltersBar = (
      await import('../../src/components/ProductsList/ResultsFilterBar')
    ).default
    render(<DynamicResultsFiltersBar />)
    expect(getColorButtonProps).toHaveBeenCalled()
    expect(screen.getByTestId('color-options-list')).toBeInTheDocument()
  })

  it('handles modal display logic if applicable', async () => {
    vi.doMock(
      '../../src/components/ProductsList/hooks/useResultsFiltersBar',
      () => ({
        default: () => ({
          showFilters: true,
          filtersAppied: true,
          colorOptions: [{ color: 'red', label: 'Red', name: 'Red' }],
          selectedColors: ['red'],
          hoveredColor: null,
          handleShowFilters,
          handleCloseFilterResults,
          handleRemoveFilter,
          getColorButtonProps,
        }),
      })
    )

    const ResultsFiltersBar = (
      await import('../../src/components/ProductsList/ResultsFilterBar')
    ).default
    render(<ResultsFiltersBar />)
    expect(screen.getByTestId('alert-modal')).toBeInTheDocument()
  })
})

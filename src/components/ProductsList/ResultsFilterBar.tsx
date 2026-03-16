import React from 'react'
import { useProductsContext } from '../../context/ProductsContext'
import useResultsFiltersBar from './hooks/useResultsFiltersBar'
import { useAlertModal } from '../Shared/Modal/hooks/useAlertModal'
import type {
  ColorOption,
  ResultsFiltersBarProps,
} from './types/ResultsFiltersBarTypes'
import ColorOptionsListItem from '../Shared/ColorOptionsListItem/ColorOptionsListItem'
import CloseIcon from '../Ui/Icons/CloseIcon'
import './styles/ResultsFiltersBarStyles.scss'

export default function ResultsFiltersBar({
  onApplyFilter,
}: ResultsFiltersBarProps = {}) {
  const { filteredProducts, hasFetched } = useProductsContext()
  const { showModal, AlertModal } = useAlertModal()
  const {
    showFilters,
    filtersAppied,
    colorOptions,
    selectedColors,
    hoveredColor,
    handleShowFilters,
    handleCloseFilterResults,
    handleRemoveFilter,
    getColorButtonProps,
  } = useResultsFiltersBar(filteredProducts, showModal)

  if (!hasFetched) return null

  return (
    <div className='results-filters-modal-wrapper'>
      <div className='results-filter-wrapper'>
        {!showFilters && (
          <p data-testid='results-count' className='counter-text'>
            {filteredProducts.length} results
          </p>
        )}

        <div className='filters-wrapper'>
          {!showFilters && (
            <button
              data-testid='filter-button'
              onClick={handleShowFilters}
              className='filter-btn'
            >
              Filtrar
            </button>
          )}

          {!showFilters && filtersAppied && (
            <div className='filters-options-wrapper'>
              <p
                className='selected-color-count'
                data-testid='selected-color-count'
              >
                ({selectedColors.length})
              </p>

              <button onClick={handleRemoveFilter} className='close-btn'>
                <CloseIcon className='close-btn-icon' />
              </button>
            </div>
          )}

          {showFilters && (
            <div className='color-options-container'>
              <div className='color-options-wrapper'>
                <ul
                  data-testid='color-options-list'
                  className='color-options-list'
                >
                  {colorOptions.map((colorOption: ColorOption) => (
                    <React.Fragment key={colorOption.name}>
                      <ColorOptionsListItem
                        colorOption={colorOption}
                        getColorButtonProps={getColorButtonProps}
                      />
                    </React.Fragment>
                  ))}
                </ul>

                <button
                  onClick={onApplyFilter || handleCloseFilterResults}
                  className='filters-list-close-btn'
                >
                  Cerrar
                </button>
              </div>

              <p data-testid='color-name-text' className='color-name-text'>
                {hoveredColor || ''}
              </p>
            </div>
          )}
        </div>
      </div>

      {AlertModal}
    </div>
  )
}

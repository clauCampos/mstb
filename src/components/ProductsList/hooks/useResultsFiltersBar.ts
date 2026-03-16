import { useState, useCallback } from 'react'
import { fallbackColorOptions } from '../../../constants/colorOptions'
import { getSharedColorButtonProps } from '../../Shared/ColorOptionsListItem/types/getSharedColorButtonProps'
import type { ProductWithColors } from '../../../types/ProductWithColors'
import type { ColorOption } from '../../../types/ColorOption'

const useResultsFiltersBar = (
  filteredProducts: ProductWithColors[] = [],
  setAlertMsg?: (msg: string) => void
) => {
  const [showFilters, setShowFilters] = useState(false)

  const colorOptions: ColorOption[] =
    filteredProducts.length > 0 &&
    filteredProducts[0]?.colorOptions &&
    filteredProducts[0].colorOptions.length > 0
      ? filteredProducts[0].colorOptions
      : fallbackColorOptions

  const [filtersAppied, setFiltersAppied] = useState(false)
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [hoveredColor, setHoveredColor] = useState<string | null>(null)

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    )
    setFiltersAppied(true)
  }, [])

  const handleButtonMouseEnter = useCallback((color: string) => {
    setHoveredColor(color)
  }, [])

  const handleButtonMouseLeave = useCallback(() => {
    setHoveredColor(null)
  }, [])

  const showAlert = useCallback(() => {
    if (setAlertMsg) {
      setAlertMsg('Filtering feature not implemented yet!')
    }
  }, [setAlertMsg])

  const getColorButtonProps = useCallback(
    (colorOption: ColorOption) =>
      getSharedColorButtonProps(
        colorOption,
        selectedColors.includes(colorOption.name),
        () => {
          handleColorSelect(colorOption.name)
          showAlert()
        },
        () => handleButtonMouseEnter(colorOption.name),
        handleButtonMouseLeave
      ),
    [
      selectedColors,
      handleColorSelect,
      handleButtonMouseEnter,
      handleButtonMouseLeave,
      showAlert,
    ]
  )

  const handleShowFilters = useCallback(() => {
    setSelectedColors([])
    setShowFilters(true)
  }, [])

  const handleFilterResults = () => {
    setShowFilters(false)
    setFiltersAppied(true)
  }

  const handleCloseFilterResults = () => {
    setShowFilters(false)
  }

  const handleRemoveFilter = () => {
    setSelectedColors([])
    setFiltersAppied(false)
  }

  const handleCloseModal = () => {
    if (setAlertMsg) setAlertMsg('')
  }

  return {
    showFilters,
    filtersAppied,
    colorOptions,
    selectedColors,
    hoveredColor,
    getColorButtonProps,
    handleColorSelect,
    handleButtonMouseEnter,
    handleButtonMouseLeave,
    handleFilterResults,
    handleShowFilters,
    handleCloseFilterResults,
    handleRemoveFilter,
    handleCloseModal,
  }
}

export default useResultsFiltersBar

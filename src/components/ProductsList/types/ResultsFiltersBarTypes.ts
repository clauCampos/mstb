import React from 'react'

export interface ResultsFiltersBarProps {
  displayColor?: string | null
  setDisplayColor?: React.Dispatch<React.SetStateAction<string | null>>
  onApplyFilter?: () => void
}

export interface ColorOption {
  name: string
  hexCode: string
}

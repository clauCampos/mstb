import React from 'react'
import type { ColorOption } from '../../../../types/ColorOption'

export function getSharedColorButtonProps(
  colorOption: ColorOption,
  isSelected: boolean,
  onClick: () => void,
  onMouseEnter: () => void,
  onMouseLeave: () => void
): React.ButtonHTMLAttributes<HTMLButtonElement> {
  return {
    type: 'button',
    style: {
      backgroundColor: colorOption.hexCode,
    },
    onClick,
    onMouseEnter,
    onMouseLeave,
    'aria-label': colorOption.name,
    'aria-pressed': isSelected,
  }
}

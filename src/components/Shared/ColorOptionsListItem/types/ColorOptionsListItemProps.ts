import React from 'react'
import type { ColorOption } from '../../../../types/ColorOption'

export interface ColorOptionsListItemProps {
  colorOption: ColorOption
  getColorButtonProps: (
    colorOption: ColorOption
  ) => React.ButtonHTMLAttributes<HTMLButtonElement>
}

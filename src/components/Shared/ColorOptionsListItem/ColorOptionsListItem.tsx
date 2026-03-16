import React from 'react'
import type { ColorOptionsListItemProps } from './types/ColorOptionsListItemProps'
import './styles/ColorOptionsListItemStyles.scss'

const ColorOptionsListItem: React.FC<ColorOptionsListItemProps> = ({
  colorOption,
  getColorButtonProps,
}) => {
  const buttonProps = getColorButtonProps(colorOption)
  const isSelected = buttonProps['aria-pressed']
  return (
    <li>
      <button
        data-testid='color-option'
        className={`color-btns${isSelected ? ' selected' : ''}`}
        style={{ backgroundColor: colorOption.hexCode }}
        {...buttonProps}
      />
    </li>
  )
}

export default ColorOptionsListItem

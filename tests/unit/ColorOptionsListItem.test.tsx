import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ColorOptionsListItem from '../../src/components/Shared/ColorOptionsListItem/ColorOptionsListItem'
import type { ColorOption } from '../../src/types/ColorOption'

const colorOption: ColorOption = {
  name: 'Red',
  hexCode: '#ff0000',
}

const getColorButtonProps = vi.fn()

describe('ColorOptionsListItem', () => {
  beforeEach(() => {
    getColorButtonProps.mockReset()
  })

  it('renders color option as button', () => {
    getColorButtonProps.mockReturnValue({
      'aria-pressed': false,
      onClick: vi.fn(),
      onMouseEnter: vi.fn(),
      onMouseLeave: vi.fn(),
      children: colorOption.name,
      style: { backgroundColor: colorOption.hexCode },
    })
    render(
      <ul>
        <ColorOptionsListItem
          colorOption={colorOption}
          getColorButtonProps={getColorButtonProps}
        />
      </ul>
    )
    const btn = screen.getByTestId('color-option')
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveTextContent('Red')
    expect(btn).toHaveStyle({ backgroundColor: '#ff0000' })
  })

  it('handles selection and hover logic', () => {
    const onClick = vi.fn()
    const onMouseEnter = vi.fn()
    const onMouseLeave = vi.fn()
    getColorButtonProps.mockReturnValue({
      'aria-pressed': true,
      onClick,
      onMouseEnter,
      onMouseLeave,
      children: colorOption.name,
      style: { backgroundColor: colorOption.hexCode },
    })
    render(
      <ul>
        <ColorOptionsListItem
          colorOption={colorOption}
          getColorButtonProps={getColorButtonProps}
        />
      </ul>
    )
    const btn = screen.getByTestId('color-option')
    expect(btn.className).toContain('selected')
    fireEvent.click(btn)
    expect(onClick).toHaveBeenCalled()
    fireEvent.mouseEnter(btn)
    expect(onMouseEnter).toHaveBeenCalled()
    fireEvent.mouseLeave(btn)
    expect(onMouseLeave).toHaveBeenCalled()
  })
})

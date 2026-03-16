import type { IconsTypes } from './types/IconsTypes'

export default function CloseIcon({
  className,
  fill = 'currentColor',
  title = 'Close icon',
}: IconsTypes) {
  return (
    <svg
      width='8'
      height='8'
      viewBox='0 0 8 8'
      fill={fill}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-label={title}
      data-testid={title}
    >
      <title>{title}</title>
      <path d='M3.22887 3.66225L0 6.72967L0.626131 7.3245L3.855 4.25707L7.08387 7.3245L7.71 6.72967L4.48113 3.66225L7.71 0.594825L7.08387 0L3.855 3.06742L0.626131 0L0 0.594825L3.22887 3.66225Z' />
    </svg>
  )
}

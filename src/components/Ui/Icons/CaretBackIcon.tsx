import type { IconsTypes } from './types/IconsTypes'

export default function CaretBackIcon({
  className,
  fill = 'currentColor',
  title = 'Back icon',
}: IconsTypes) {
  return (
    <svg
      width='6'
      height='9'
      viewBox='0 0 6 9'
      fill={fill}
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      role='img'
      aria-label={title}
      data-testid={title}
    >
      <title>{title}</title>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M4.35355 0L5.06066 0.707107L1.41421 4.35355L5.06066 8L4.35355 8.70711L0 4.35355L4.35355 0Z'
      />
    </svg>
  )
}

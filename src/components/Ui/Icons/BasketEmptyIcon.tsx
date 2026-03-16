import type { IconsTypes } from './types/IconsTypes'

export default function BasketEmptyIcon({
  className,
  fill = 'currentColor',
  title = 'Basket empty icon',
}: IconsTypes) {
  return (
    <svg
      width='13'
      height='16'
      viewBox='0 0 13 16'
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
        d='M8.47059 0H3.76471V3.76471H0V16H12.2353V3.76471H8.47059V0ZM7.52941 4.70588V7.05882H8.47059V4.70588H11.2941V15.0588H0.941176V4.70588H3.76471V7.05882H4.70588V4.70588H7.52941ZM7.52941 3.76471V0.941176H4.70588V3.76471H7.52941Z'
      />
    </svg>
  )
}

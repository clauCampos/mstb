import { useCallback } from 'react'
import React from 'react'

export function useModal() {
  const handleContentClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()
    },
    []
  )

  return {
    handleContentClick,
  }
}

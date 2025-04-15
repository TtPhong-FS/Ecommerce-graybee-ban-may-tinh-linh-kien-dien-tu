import { createSelector } from '@reduxjs/toolkit'

const selectCarouselState = (state) => state.carousel

export const getCarouselByCategoryAndType = (category, type) =>
  createSelector([selectCarouselState], (carousel) => carousel?.[category]?.[type] || [])

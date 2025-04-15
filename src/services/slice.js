import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentPage: null,
  currentUrl: null,
  oldPage: null,
  oldUrl: null
}

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setNavigation: (state, action) => {
      const { pathname, pageName } = action.payload

      state.oldUrl = state.currentUrl
      state.oldPage = state.currentPage

      state.currentUrl = pathname
      state.currentPage = pageName
    }
  },
  extraReducers: (builder) => {}
})

export const { setNavigation } = generalSlice.actions
export default generalSlice.reducer

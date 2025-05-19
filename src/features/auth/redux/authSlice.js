import { createSlice } from '@reduxjs/toolkit'
import { loginUserAsync, registerUserAsync } from './authThunk'

const initialState = {
  isLogin: false,
  isLogout: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false
      state.isLogout = true
    },
    refreshLogin: (state) => {
      state.isLogin = true
      state.isLogout = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.fulfilled, (state) => {
        state.isLogin = true
      })
      .addCase(loginUserAsync.rejected, (state) => {
        state.isLogin = false
      })

      .addCase(registerUserAsync.fulfilled, (state) => {
        state.isLogin = true
      })
      .addCase(registerUserAsync.rejected, (state) => {
        state.isLogin = false
      })
  }
})

export const { logout, refreshLogin } = authSlice.actions
export default authSlice.reducer

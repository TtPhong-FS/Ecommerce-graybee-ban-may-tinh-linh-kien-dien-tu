import { createSlice } from '@reduxjs/toolkit'
import { handleLogin, handleSignUp } from './thunk'

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
      .addCase(handleLogin.fulfilled, (state) => {
        state.isLogin = true
      })
      .addCase(handleLogin.rejected, (state) => {
        state.isLogin = false
      })

      .addCase(handleSignUp.fulfilled, (state) => {
        state.isLogin = true
      })
      .addCase(handleSignUp.rejected, (state) => {
        state.isLogin = false
      })
  }
})

export const { logout, refreshLogin } = authSlice.actions
export default authSlice.reducer

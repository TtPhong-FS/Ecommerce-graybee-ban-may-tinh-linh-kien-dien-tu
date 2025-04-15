import { createSlice } from '@reduxjs/toolkit'
import { Login, SignUp } from './thunk'

const initialState = {
  error: null,
  status: 'idle',
  isLogin: false,
  isLogout: false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.status = 'logout'
      state.isLogin = false
      state.isLogout = true
    },
    refreshLogin: (state) => {
      state.status = 'login'
      state.isLogin = true
      state.isLogout = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(Login.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(Login.fulfilled, (state) => {
        state.status = 'success'
        state.isLogin = true
      })
      .addCase(Login.rejected, (state, action) => {
        state.isLogin = false
        state.error = action.error.message
      })

      .addCase(SignUp.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(SignUp.fulfilled, (state) => {
        state.status = 'success'
        state.isLogin = true
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.isLogin = false
        state.error = action.error.message
      })
  }
})

export const { logout, refreshLogin } = authSlice.actions
export default authSlice.reducer

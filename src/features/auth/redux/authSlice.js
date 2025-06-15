import { createSlice } from '@reduxjs/toolkit'
import { loginUserAsync, registerUserAsync } from './authThunk'

const initialState = {
  isLogin: false,
  isLogout: false,
  role: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false
      state.isLogout = true
    },
    refreshLogin: (state, action) => {
      state.role = action.payload
      state.isLogin = true
      state.isLogout = false
    },
    setRole: (state, action) => {
      state.role = action.payload
      state.isLogin = true
      state.isLogout = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.rejected, (state) => {
        state.isLogin = false
        state.role = null
      })
      .addCase(registerUserAsync.rejected, (state) => {
        state.isLogin = false
        state.role = null
      })
  }
})

export const { logout, refreshLogin, setRole } = authSlice.actions
export default authSlice.reducer

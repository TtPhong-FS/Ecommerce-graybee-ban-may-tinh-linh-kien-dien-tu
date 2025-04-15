import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../../../config/axiosServer'

const general_endpoint = '/api/v1/general'

export const getAddressExisting = (token) =>
  API_URL.get(`${general_endpoint}/address-existing`, {
    headers: {
      Authorization: token
    }
  })

export const fetchAddressExistingByTokenOrSessionId = createAsyncThunk(
  'address/fetchAddressExistingByTokenOrSessionId',
  async ({ token }, { rejectWithValue }) => {
    try {
      const res = await getAddressExisting(token)
      return res.data
    } catch (error) {}
  }
)

const initialState = {
  addressExisting: [],
  error: null
}

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddressExistingByTokenOrSessionId.fulfilled, (state, action) => {
        state.addressExisting = action.payload?.data || []
      })
      .addCase(fetchAddressExistingByTokenOrSessionId.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})

export default addressSlice.reducer

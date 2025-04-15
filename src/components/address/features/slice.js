import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { privateAPI } from '../../../config/axiosServer'

const general_endpoint = '/api/v1/general'

export const getAddressExisting = () => privateAPI.get(`${general_endpoint}/address-existing`, {})

export const fetchAddressExistingByTokenOrSessionId = createAsyncThunk(
  'address/fetchAddressExistingByTokenOrSessionId',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAddressExisting()
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

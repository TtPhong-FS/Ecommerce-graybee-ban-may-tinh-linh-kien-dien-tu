import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { privateAPI } from '../../../config/axiosServer'

const account_endpoint = '/api/v1/public/order'

export const getAddressExisting = () => privateAPI.get(`${account_endpoint}/address-existing`)

export const fetchAddressExistingByTokenOrSessionId = createAsyncThunk(
  'address/fetchAddressExistingByTokenOrSessionId',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAddressExisting()
      return res.data
    } catch (error) {
      if (error.code === 'EER_NETWORK' || error.message === 'Network Error') {
        return rejectWithValue({
          unconnect: 'Không thể kết nối đến server. Vui lòng kiểm tra mạng và thử lại!'
        })
      }
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data)
      }
    }
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

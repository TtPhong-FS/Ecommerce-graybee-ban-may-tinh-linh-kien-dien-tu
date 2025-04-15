import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { removeItemsByIds } from '../../../components/cart/features/slice'
import { API_URL } from '../../../config/axiosServer'

const order_endpoint = '/api/v1/public/order'

const createOrderApi = (request, token) =>
  API_URL.post(`${order_endpoint}/create`, request, {
    headers: {
      Authorization: token
    }
  })

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async ({ request, token }, { dispatch, rejectWithValue }) => {
    try {
      const res = await createOrderApi(request, token)

      const cartItemIds = res.data.data
      console.log(cartItemIds)
      dispatch(removeItemsByIds(cartItemIds))
      return res.data
    } catch (error) {
      console.error(error)
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
  error: null,
  status: 'idle',
  customerOrder: null
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.error = null
        state.status = 'loading'
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'success'
        state.customerOrder = action.payload?.data || null
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.error.message
        state.status = 'failed'
      })
  }
})

export default orderSlice.reducer

import { handleCreateAsyncThunk } from '@/components/func'
import { createSlice } from '@reduxjs/toolkit'
import { privateAPI } from '../../../config/axiosServer'

const order_endpoint = '/api/v1/public/order'

const createOrderApi = (request) => privateAPI.post(`${order_endpoint}/create`, request, {})

export const createOrder = handleCreateAsyncThunk('order/createOrder', async (request) => {
  const res = await createOrderApi(request)

  return res.data
})

const initialState = {
  customerOrder: null
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.customerOrder = action.payload?.data || null
    })
  }
})

export default orderSlice.reducer

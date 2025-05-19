import { handleCreateAsyncThunk } from '@/lib'
import { createSlice } from '@reduxjs/toolkit'

const order_endpoint = '/api/v1/public/order'

const postOrder = (request) => privateAPI.post(`${order_endpoint}/create`, request, {})

export const createOrderAsync = handleCreateAsyncThunk('order/createOrderAsync', async (request) => {
  const res = await postOrder(request)
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
    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      state.customerOrder = action.payload?.data || null
    })
  }
})

export default orderSlice.reducer

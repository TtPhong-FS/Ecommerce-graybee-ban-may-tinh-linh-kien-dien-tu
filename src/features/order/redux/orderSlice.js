import { privateAPI } from '@/config'
import { handleCreateAsyncThunk } from '@/lib'
import { createSlice } from '@reduxjs/toolkit'

const order_endpoint = '/api/v1/public/orders'

const createOrder = (request) => privateAPI.post(order_endpoint, request)

export const createOrderAsync = handleCreateAsyncThunk('order/createOrderAsync', async (request) => {
  const res = await createOrder(request)
  return res.data
})

const initialState = {
  customerOrder: null,
  customerForm: {
    recipientName: '',
    phone: '',
    email: '',
    city: '',
    commune: '',
    district: '',
    streetAddress: ''
  }
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCustomerForm: (state, action) => {
      state.customerForm = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrderAsync.fulfilled, (state, action) => {
      state.customerOrder = action.payload?.data || null
    })
  }
})

export const { setCustomerForm } = orderSlice.actions
export default orderSlice.reducer

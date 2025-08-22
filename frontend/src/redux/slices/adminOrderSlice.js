import { createSlice, createAsyncThunk, __DO_NOT_USE__ActionTypes} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchAllOrders =createAsyncThunk(
    'adminOrders/fetchAllOrders',
    async(__DO_NOT_USE__ActionTypes, {rejectWithValues}) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    }
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValues(error.response.data)
        }
    }
)

export const updateOrderStatus =createAsyncThunk(
    'adminOrders/updateOrderStatus',
    async({id, status}, {rejectWithValues}) => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                {status},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    }
                }
            )
            return response.data
        } catch (error) {
            return rejectWithValues(error.response.data)
        }
    }
)

export const deleteOrder =createAsyncThunk(
    'adminOrders/deleteOrder',
    async(id, {rejectWithValues}) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                    }
                }
            )
            return id
        } catch (error) {
            return rejectWithValues(error.response.data)
        }
    }
)

const adminOrderSlice = createSlice({
    name: 'adminOrders',
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllOrders.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.loading = false
            state.orders = action.payload
            state.totalOrders = action.payload.length

            const totalSales = action.payload.reduce((acc, order) => {
                return acc + order.totalPrice
            }, 0)
            state.totalSales = totalSales

        })
        .addCase(fetchAllOrders.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        .addCase(updateOrderStatus.fulfilled, (state, action) => {
            const updatedOrder = action.payload
            const orderIndex = state.orders.findIndex(
                (order) => order._id === updatedOrder._id
            )
            if(orderIndex !== -1) {
                state.orders[orderIndex] = updatedOrder
            }
        })

        .addCase(deleteOrder.fulfilled, (action, state) => {
            state.orders = state.orders.filters(
                (order) => order._id !== action.payload
            )
        })
    }
})

export default adminOrderSlice.reducer

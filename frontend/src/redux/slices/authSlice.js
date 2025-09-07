import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { mergeCart, fetchCart } from '../slices/cartSlice'

import axios from 'axios'

const userFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initialGuestId = localStorage.getItem('guestId') || `guest_${new Date().getTime()}`
localStorage.setItem('guestId', initialGuestId)

const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null
}


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, {dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData,
        { withCredentials: true }
      )

       const user = response.data.user
       const token = response.data.token

      localStorage.setItem('userInfo', JSON.stringify(response.data.user))
      localStorage.setItem('userToken', response.data.token)

      const guestId = localStorage.getItem('guestId')
      if(guestId){
        await dispatch(mergeCart({guestId, user}))
      }

      await dispatch(fetchCart({userId: user._id}))

      return user

    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Login failed')
    }
  }
)


export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (userData, {dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/signup-details`,
        userData,
        { withCredentials: true }
      )

      const user = response.data.user
      const token = response.data.token

      localStorage.setItem('userInfo', JSON.stringify(response.data.user))
      localStorage.setItem('userToken', response.data.token)

      const guestId = localStorage.getItem('guestId')
      if(guestId){
        await dispatch(mergeCart({guestId, user}))
      }

      await dispatch(fetchCart({userId: user._id}))

      return user

      return response.data.user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Signup failed')
    }
  }
)

import { clearCart } from './cartSlice'

export const logoutUser = () => (dispatch) => {
  // Clear auth info from localStorage
  localStorage.removeItem('userInfo')
  localStorage.removeItem('userToken')

  // Generate a fresh guestId
  const newGuestId = `guest_${new Date().getTime()}`
  localStorage.setItem('guestId', newGuestId)

  // Clear redux state
  dispatch(clearCart())                     // empty cart state
  dispatch(authSlice.actions.logout(newGuestId)) // reset auth with new guestId
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null
      state.guestId = action.payload
      localStorage.removeItem('userInfo')
      localStorage.removeItem('userToken')
      localStorage.setItem('guestId', state.guestId)
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`
      localStorage.setItem('guestId', state.guestId)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Signup failed'
      })

      
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Login failed'
      })
  }
})

export const { logout, generateNewGuestId } = authSlice.actions
export default authSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    set: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
})

export const { increment, decrement, set, reset } = counterSlice.actions

export const selectCount = (state) => state.counter.value

export default counterSlice.reducer

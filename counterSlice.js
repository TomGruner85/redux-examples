import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  visible: true,
};

const incrementReducer = (state, action) => {
  return {
    ...state,
    value: state.value + 1,
  };
};

const decrementReducer = (state, action) => {
  return {
    ...state,
    value: state.value - 1,
  };
};

const incrementByReducer = (state, action) => {
  return {
    ...state,
    value: state.value + action.payload,
  };
};

const toggleVisibleReducer = (state, action) => {
  return {
    ...state,
    visible: !state.visible,
  };
};

const counterSlice = createSlice({
  name: "Counter",
  initialState,
  reducers: {
    increment: incrementReducer,
    decrement: decrementReducer,
    incrementBy: incrementByReducer,
    toggleVisible: toggleVisibleReducer,
  },
});

export const { increment, decrement, incrementBy, toggleVisible } =
  counterSlice.actions;
export const currentValue = (state) => state.counter.value;
export const isVisible = (state) => state.counter.visible;

export default counterSlice.reducer;

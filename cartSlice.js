import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  items: [],
  visible: false,
};

const recalculateItemTotal = (item) => {
  return item.quantity * item.price;
};

const showCartReducer = (state) => {
  state.visible = true;
};

const hideCartReducer = (state) => {
  state.visible = false;
};

const toggleCartReducer = (state) => {
  state.visible = !state.visible;
};

const addItemReducer = (state, action) => {
  const itemAlreadyInCart = state.items.findIndex(
    (item) => item.id === action.payload.id
  );
  if (itemAlreadyInCart !== -1) {
    state.items[itemAlreadyInCart].quantity++;
    state.items[itemAlreadyInCart].total = recalculateItemTotal(
      state.items[itemAlreadyInCart]
    );
  } else {
    state.items.push(action.payload);
  }
};

const addItemsReducer = (state, action) => {
  console.log(action.payload);
  action.payload.forEach((item) => {
    state.items.push(item);
  });
};

const removeItemReducer = (state, action) => {
  const findItemIndex = state.items.findIndex(
    (item) => item.id === action.payload.id
  );
  if (state.items[findItemIndex].quantity === 1) {
    state.items = state.items.filter((item) => item.id !== action.payload.id);
  } else {
    state.items[findItemIndex].quantity--;
    state.items[findItemIndex].total = recalculateItemTotal(
      state.items[findItemIndex]
    );
  }
};

const populateCartReducer = (state, action) => {
    state.items = action.payload
    state.visible = false
}

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    showCart: showCartReducer,
    hideCart: hideCartReducer,
    toggleCart: toggleCartReducer,
    addItem: addItemReducer,
    addItems: addItemsReducer,
    removeItem: removeItemReducer,
    populateCart: populateCartReducer
  },
});

export const cartIsVisible = (state) => state.cart.visible;

export const numOfitemsInCart = (state) => {
  return state.cart.items.reduce((sum, item) => {
    return (sum += item.quantity);
  }, 0);
};

export const itemsInCart = (state) => state.cart.items;

export const grandTotal = (state) => {
  return state.cart.items.reduce((sum, item) => {
    return (sum += item.total);
  }, 0);
};

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

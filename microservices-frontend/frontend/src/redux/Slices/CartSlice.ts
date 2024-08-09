import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItem {
  sku: string;
  price: number;
  quantity: number;
  size:string;
}

interface CartState {
    items: CartItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  const initialState: CartState = {
    items: [],
    status: 'idle',
    error: null,
  };
  

  
  const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addItem: (state, action: PayloadAction<CartItem>) => {
        state.items.push(action.payload);
        state.status = 'succeeded';
        state.error = null;
      },
      submitOrder: (state, action: PayloadAction<CartItem[]>) => {
        state.items = [];
        state.status = 'succeeded';
        state.error = null;
      },
      setError: (state, action: PayloadAction<string>) => {
        state.status = 'failed';
        state.error = action.payload;
      },
      clearError: (state) => {
        state.status = 'idle';
        state.error = null;
      },
      clear: (state) => {
        state.items = [];
        state.status = 'idle';
        state.error = null;
      },
      setLoading: (state) => {
        state.status = 'loading';
      },
      removeItem: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(item => item.sku !== action.payload);
      },
      updateItemQuantity: (state, action: PayloadAction<{ sku: string; quantity: number }>) => {
        const item = state.items.find(item => item.sku === action.payload.sku);
        if (item) {
          item.quantity = action.payload.quantity;
        }
      },
    },
  });
  
  export const { addItem, submitOrder, setError, clearError, setLoading,removeItem,updateItemQuantity,clear } = cartSlice.actions;
  
  export default cartSlice.reducer;
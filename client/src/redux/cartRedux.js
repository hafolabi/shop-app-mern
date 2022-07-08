import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      const itemIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (itemIndex >= 0) {
        state.products[itemIndex].quantity += 1;
        state.quantity +=1
        toast.info(`Increased ${state.products[itemIndex].title} cart quantity`, {
            position: "bottom-left",
          });
      } else {
        state.quantity += action.payload.quantity
        state.products.push(action.payload);
        toast.success(`${action.payload.title} added to cart`, {
            position: "bottom-left",
          });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.products));
    },

    removeFromCart: (state, action) => {
      const newProducts = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.products = newProducts;

      toast.error(`${action.payload.title} removed from cart`, {
        position: "bottom-left",
      });
      localStorage.setItem("cartItems", JSON.stringify(state.products));
    },

    decreaseCart: (state, action) => {
      const itemIndex = state.products.findIndex(
        (product) => product._id === action.payload._id
      );

      if (state.products[itemIndex].quantity > 1) {
        state.products[itemIndex].quantity -= 1;
        toast.info(`Decreased ${action.payload.title} cart Quantity`, {
          position: "bottom-left",
        });
      } else if (state.products[itemIndex].quantity === 1) {
        const newProducts = state.products.filter(
          (product) => product._id !== action.payload._id
        );
        state.products = newProducts;
        toast.error(`${action.payload.title} removed from cart`, {
          position: "bottom-left",
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.products));
    },

    clearCart:(state)=>{
      state.products= []
    },

    getTotals(state) {
      let { total, quantity } = state.products.reduce(
        (cartTotal, product) => {
          const { price, quantity } = product;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.quantity = quantity;
      state.total = total;
    },
  },
});

export const { addProduct, removeFromCart, getTotals, decreaseCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

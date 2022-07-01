import {createSlice} from "@reduxjs/toolkit";

const initialState={
 cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
 cartTotalQuantity:0,
 cartTotalAmount:0,
};

const cartSlice=createSlice({
 name:'cart',
 initialState,
 reducers:{
  // add to cart function 
 addToCart(state,action){
   const existingIndex = state.cartItems.findIndex(
   (item) => item.id === action.payload.id
    );
      if (existingIndex >= 0) {
       state.cartItems[existingIndex] = {
       ...state.cartItems[existingIndex],
       cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,      
       };
       } else{
        let tempProductItem = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProductItem);       
        }
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
       },

      // remove from cart function 
       removeFromCart(state,action){
       const remainingCart= state.cartItems.filter(cartItem=>cartItem.id!==action.payload.id);
       state.cartItems=remainingCart
       localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
       },
      // decrease from cart quantity 
      decreasement(state,action){
      const remainingQuantity=state.cartItems.findIndex(cartItem=>cartItem.id===action.payload.id);
      if(state.cartItems[remainingQuantity].cartQuantity>1){
        state.cartItems[remainingQuantity].cartQuantity -=1
      }
      else if(state.cartItems[remainingQuantity].cartQuantity===1){
        const remainingCart= state.cartItems.filter(cartItem=>cartItem.id!==action.payload.id);
        state.cartItems=remainingCart;     
      }
      localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
      },
      // clear the cart 
      clearCart(state,action){
        state.cartItems=[]
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems));
      },
      // get the subtotal 
      getTotals(state, action) {
        let { total, quantity } = state.cartItems.reduce(
          (cartTotal, cartItem) => {
            const { price, cartQuantity } = cartItem;
            const itemTotal = price * cartQuantity;
  
            cartTotal.total += itemTotal;
            cartTotal.quantity += cartQuantity;
  
            return cartTotal;
          },
          {
            total: 0,
            quantity: 0,
          }
        );
        total = parseFloat(total.toFixed(2));
        state.cartTotalQuantity = quantity;
        state.cartTotalAmount = total;
      },

       },
       })

export const {addToCart,removeFromCart,decreasement,clearCart,getTotals}=cartSlice.actions;
export default cartSlice.reducer;
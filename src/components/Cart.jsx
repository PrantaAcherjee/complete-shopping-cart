import React,{useEffect}from 'react';
import {useSelector,useDispatch} from "react-redux";
import { removeFromCart,decreasement,addToCart,clearCart,getTotals} from '../features/cartSlice';

const Cart = () => {
  const cart =useSelector(state=>state.cart);
  const dispatch=useDispatch();

  const handleRemove=(cartItem)=>{
   dispatch(removeFromCart(cartItem))
  };
  const handleDecrement=(cartItem)=>{
    dispatch(decreasement(cartItem))
  };
  const handleIncrement=(cartItem)=>{
    dispatch(addToCart(cartItem))
  };

  const handleClearCart=()=>{
    dispatch(clearCart())
  }

  useEffect(()=>{
   dispatch(getTotals()) 
  },[cart,dispatch])

  return (
    <div>
      <h2>Shopping cart</h2>
      {
        cart.cartItems.length===0?(<div>
          Your cart is empty now !
        </div>):
        (<div>
            {cart.cartItems &&
              cart.cartItems.map(cartItem=>(
                <div key={cartItem.id} style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
                  <img style={{width:'120px',height:'120px'}} src={cartItem.image} alt="item"/>
                  <p>Product: {cartItem.title} <br/> <span 
                  onClick={()=>handleRemove(cartItem)}
                  style={{cursor:'pointer'}}>Remove</span></p>
                  <p>Price: {cartItem.price}</p>
                  <div>
                    <button onClick={()=>handleIncrement(cartItem)}>+</button>
                    <span>{cartItem.cartQuantity}</span>
                    <button onClick={()=>handleDecrement(cartItem)}>-</button>
                  </div>
                  <p>Total:{cartItem.price*cartItem.cartQuantity}</p>
                </div>               
                
              ))
              
            }
            <div style={{display:'flex',justifyContent:'space-around'}}>
              <div>
                <button onClick={handleClearCart}>Clear the cart</button>
              </div>
              <div>
                Subtotal Amount
                <hr/>
                <p>{cart.cartTotalAmount}</p>
                <button>Checkout</button>
              </div>
            </div>
        </div>)
      }
    </div>
  )
}

export default Cart
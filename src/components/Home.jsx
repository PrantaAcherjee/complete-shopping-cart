import React from 'react';
import {useHistory} from "react-router-dom";
import { addToCart } from '../features/cartSlice';
import { useDispatch } from 'react-redux';
import {useGetAllProductsQuery} from '../features/productsApi';


const Home = () => {
const { data, error, isLoading } = useGetAllProductsQuery();
const dispatch=useDispatch();
const history=useHistory();
const handleAddToCart=(product)=>{
dispatch(addToCart(product))
history.replace("/cart")
};

  return (
    <div>
     {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
           {
                data.map(d=>(
                <div key={d.id} style={{margin:'35px 10px'}}>
                <p>Name: {d.title}</p>
                <img style={{width:'300px',height:'300px'}} src={d.image} alt="name" />
                <p>Price:{d.price}</p>
                <p><small>{d.description}</small></p>
                <button onClick={()=>handleAddToCart(d)}>Add to cart</button>
                </div>
                ))
           }
           
        </>
      ) : null}
    </div>
  )
}

export default Home;
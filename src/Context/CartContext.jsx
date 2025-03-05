import axios from 'axios'
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast';


export const CartContext = createContext()


export default function CartContextProvider({ children }) {
    
    const [cartId, setCartId] = useState()
    const [cartData,setCartData] = useState([])
    const [numCartItems,setNumCartItems] = useState([])
    const [loading, setLoading] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [totalPrice,setTotalPrice] = useState()
    

    // buying fnc
    async function addCartItem(productId) {
        setIsAddingToCart(true)
        try{
            const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},{headers:{token:localStorage.getItem("token")}})
       if(res.data.status=="success") {
        setNumCartItems(res?.data.numOfCartItems)
        toast.success(res.data.message,{duration:1500})
       }
        
        }
        catch(err){
            console.log(err,"ERRORRR!!");
            toast.error("This didn't work.")
        }
        finally{
            setIsAddingToCart(false)
        }
    }
   //
    // display fnc

    async function getCartItems() {
        setLoading(true)
        try {
            const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:{token:localStorage.getItem('token')}})
            setCartId(res.data.cartId)
         setNumCartItems(res?.data.numOfCartItems)
         setTotalPrice(res?.data.data.totalCartPrice)
         setCartData(res?.data.data.products);
         
         
        } catch (error) {
            console.error("Error fetching cart products:", error);
           
        }
        finally{
            setLoading(false)
        }
    }
    //
    //update fnc
    async function updateCart(id,count) {
       try{
        const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers:{token:localStorage.getItem("token")}})
        setCartData(res?.data.data.products)
        setNumCartItems(res?.data.numOfCartItems)
        setTotalPrice(res?.data.data.totalCartPrice)
       }
       catch(err){
        console.log(err,"ERROR!!");
        
       }
        
    }
    //

    //delete specific ITEM
async function deleteCartItem(id) {
       try{
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:{token:localStorage.getItem("token")}})
        setCartData(res?.data.data.products)
        setNumCartItems(res?.data.numOfCartItems)
        setTotalPrice(res?.data.data.totalCartPrice)
       }
       catch(err){
        console.log(err,"ERROR!!");
        
       }
        
    }
    //
        //clear cart 
        async function clearCart() {
            setCartData([]);
            setNumCartItems(0);
            setTotalPrice(0);
          }
          
    //delete all Cart
    async function deleteAllCart() {
        try{
         const res = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{headers:{token:localStorage.getItem("token")}})
         setCartData([])
         setTotalPrice(0)
         toast.success("Cart cleared successfully!");
         setNumCartItems(res?.data.numOfCartItems)
        }
        catch(err){
         console.log(err,"ERROR!!");
         toast.error("Failed to clear cart");
        }}
    //
         
    return <>
        <CartContext.Provider value={{ addCartItem,isAddingToCart,getCartItems,clearCart,cartData,numCartItems,setNumCartItems,setCartData,setTotalPrice,loading,updateCart,deleteCartItem,deleteAllCart,totalPrice,cartId}}>
            {children}
        </CartContext.Provider>

    </>
}

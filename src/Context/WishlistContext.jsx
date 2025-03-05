import axios from 'axios';
import React, { createContext, useState } from 'react'
import toast from 'react-hot-toast';




   export const WishlistContext = createContext()

export default function WishlistContextProvider({children}) {
  const [wishlistData,setWishlistData] = useState([])
  const [wishlistCount,setWishlistCount] = useState()

  const [loading,setLoading] = useState(false)
   // to add to wishlist
   async function addWishlistItem(productId){
    try{
        const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{headers:{token:localStorage.getItem("token")}})
        if(res.data.status=="success") {
    
            toast.success(res.data.message,{duration:1500})
            setWishlistCount(data.count)

           }
    }catch(err){
        console.log(err,"ERROOOOOR!!");
        
    }
    
        
    }
      //////////////


      // to display wishlist 
      async function displayWishlist() {
        setLoading(true)
          try{
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{headers:{token:localStorage.getItem("token")}})

            setWishlistCount(data.count)
            setWishlistData(data.data)
          }
          catch(err){
            console.log(err,"DISPLAY ERRRRRORRR!!");
            
          }
          finally{
            setLoading(false)
          }
      }

        /////////////////////////
        // to delete item from wishlist 
        async function deleteWishlistItem(id) {
          try {
              const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
                  headers: { token: localStorage.getItem("token") }
              });
              
              // Ensure wishlist updates correctly
              setWishlistData((prevWishlist) => prevWishlist.filter(item => item._id !== id));
              setWishlistCount(data.count)
          } catch (err) {
              console.log(err, "MY ERROR IS HERE!!");
          }
      }
      
  return<>
  <WishlistContext.Provider value={{addWishlistItem,displayWishlist,wishlistCount,wishlistData,deleteWishlistItem,loading}}>

        {children}
  </WishlistContext.Provider>
  
  </>
}
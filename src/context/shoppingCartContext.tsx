import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartProviderProps ={
    children:ReactNode
}

type ShoppingCartContext = {
    getItemQuantity:(id:number) => number
    increaseCartQuantity:(id:number) => void
    decreaseCartQuantity:(id:number) => void
    removeFromCart:(id:number) => void
    openCart:()=>void
    closeCart:()=>void
    cartQuantity:number
    cartItems:CartItem[]
}

type CartItem ={
    id:number
    quantity:number 
}

 
const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart (){
    return useContext(ShoppingCartContext)
}


 
export function ShoppingCartProvider ({children}:ShoppingCartProviderProps){

    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)

    const cartQuantity = cartItems.reduce((quantity , item)=>{
        return item.quantity + quantity

    },0)
    const openCart = () =>setIsOpen(true)
    const closeCart = () =>setIsOpen(false)

    function getItemQuantity(id:number){
        return cartItems.find(item => item.id === id )?.quantity || 0
    }
 

     function increaseCartQuantity(id:number){
        setCartItems(currItems => {
            if(currItems.find( item=>item.id===id)==null){

                return [...currItems , {id , quantity:1}]
            }else{
                return currItems.map(item=>{
                    if(item.id===id){
                        return {...item , quantity:item.quantity + 1}
                    }else{
                        return item
                    } 
                })
            }
        })
     }

     function decreaseCartQuantity(id:number){
        setCartItems(currItems => {
            if(currItems.find( item=>item.id===id)?.quantity==1){

                return currItems.filter(item=>item.id!==id)
            }else{
                return currItems.map(item=>{
                    if(item.id===id){
                        return {...item , quantity:item.quantity - 1}
                    }else{
                        return item
                    }
                })
            }
        })
     }

    

     function removeFromCart(id:number){
        setCartItems((curritem)=>{
            return curritem.filter(item=>item.id !== id) 
        })

     }


    return <ShoppingCartContext.Provider value={{ openCart , closeCart,cartItems,cartQuantity, getItemQuantity , increaseCartQuantity ,decreaseCartQuantity , removeFromCart}}>
        {children}
        <ShoppingCart isOpen={isOpen} />

    </ShoppingCartContext.Provider>
}


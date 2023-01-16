import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import { CartItem } from "./CartItem";


type ShoppingCartProps = {
    isOpen: boolean
}
export function ShoppingCart ({isOpen}:ShoppingCartProps){
    const {closeCart , cartItems } = useShoppingCart()

    return <Offcanvas show={isOpen} onHide = {closeCart} >
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>
        
            </Offcanvas.Title>
            <Offcanvas.Body>
                <Stack gap={3} >
                    {
                        cartItems.map((item)=>{
                            return(
                                <CartItem key={item.id} {...item} />
                            )
                        })
                    }
                </Stack>
            </Offcanvas.Body>
        </Offcanvas.Header>
    </Offcanvas>
}
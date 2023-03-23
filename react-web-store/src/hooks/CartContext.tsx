import React, { createContext, ReactNode, useCallback, useContext} from "react";
import { useLocalStorage } from "./useLocalStorage";


type CartProviderProps = {
    children: ReactNode
}

type CartContext = {
    getItemQuantity: (id: number) => number,
    cartQuantity: number,
    cartItems: CartItem[],
    increaseItemCartQuantity: (id: number) => void,
    decreaseItemCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    setItemPrice: (id: number, price: number) => void,
    totalCartPrice: string
}

type CartItem = {
    id: number,
    quantity: number,
    price: number
}

const CartContext = createContext({} as CartContext)

export function useCart() {
    return useContext(CartContext)
}


export function CartProvider({ children }: CartProviderProps) {
    const [cartItemsById, setCartItemsById] = useLocalStorage<{ [key: number]: CartItem }>("shopping-cart", {})

    const cartItems = Object.values(cartItemsById)

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const totalCartPrice = cartItems.reduce((totalPrice, item) => totalPrice += item.price * item.quantity, 0).toFixed(2)

    function getItemQuantity(id: number) {
        return cartItemsById[id]?.quantity || 0
    }

    function increaseItemCartQuantity(id: number) {

        setCartItemsById(currentItemsById => {
            const newCartItemsById = { ...currentItemsById }
            if (!currentItemsById?.[id]) {
                newCartItemsById[id] = { id, quantity: 1, price: 0 }
            } else {
                const existingCartItem = newCartItemsById[id]

                if (existingCartItem) {
                    newCartItemsById[id] = { ...existingCartItem, quantity: existingCartItem.quantity + 1 }
                }
            }

            return newCartItemsById
        })
    }

    function decreaseItemCartQuantity(id: number) {
        setCartItemsById(currentItemsById => {
            const newCartItemsById = { ...currentItemsById }

            const existingCartItem = newCartItemsById[id]

            if (existingCartItem) {
                const newQuantity = existingCartItem.quantity - 1
                newCartItemsById[id] = { ...existingCartItem, quantity: newQuantity }
                if (newQuantity === 0) {
                    delete newCartItemsById[id]
                }
            }
            return newCartItemsById
        })
    }

    function removeFromCart(id: number) {
        setCartItemsById(currentItemsById => {
            const newCartItemsById = { ...currentItemsById }

            delete newCartItemsById[id]

            return newCartItemsById
        })
    }

    const setItemPrice = useCallback((id: number, price: number) => {

        setCartItemsById(currentItemsById => {
            const newCartItemsById = { ...currentItemsById }

            const existingCartItem = newCartItemsById[id]

            if (existingCartItem) {
                newCartItemsById[id] = { ...existingCartItem, price: price }
            }

            return newCartItemsById
        })
    }, [])


    return <CartContext.Provider value={{ getItemQuantity, increaseItemCartQuantity, decreaseItemCartQuantity, removeFromCart, cartQuantity, cartItems, setItemPrice, totalCartPrice }}>
        {children}
    </CartContext.Provider>
}
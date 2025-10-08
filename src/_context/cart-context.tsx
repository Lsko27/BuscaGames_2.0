"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react"
import { useSession } from "next-auth/react"

interface CartContextType {
  cartCount: number
  setCartCount: React.Dispatch<React.SetStateAction<number>>
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { data } = useSession()
  const userId = data?.user?.id
  const [cartCount, setCartCount] = useState<number>(0)

  // Memoiza a função para não recriar em cada render
  const refreshCart = useCallback(async () => {
    if (!userId) return
    try {
      const res = await fetch(`http://localhost:5050/cart?userId=${userId}`)
      const data = await res.json()
      if (data?.totalItems !== undefined) {
        setCartCount(data.totalItems)
      }
    } catch (err) {
      console.error("Erro ao buscar carrinho:", err)
    }
  }, [userId])

  useEffect(() => {
    if (userId) {
      refreshCart()
    } else {
      setCartCount(0)
    }
  }, [userId, refreshCart])

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, refreshCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider")
  }
  return context
}

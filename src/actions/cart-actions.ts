// src/app/actions/cart-actions.ts
"use server"
import { revalidatePath } from "next/cache"

export async function addToCartAction(userId: string, gameId: string) {
  // chama seu backend Node + Express
  await fetch("http://localhost:5050/cart/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, gameId }),
  })

  // revalida server components que dependem do carrinho
  revalidatePath("/cart")
}

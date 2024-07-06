"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function deleteCookies() {
    cookies().delete("Authorization")
    redirect("/login")
  }


export async function addWishlist (productId: string) {
    const response = await fetch("http://localhost:3000/api/wishlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId
      })
    })
    if(!response.ok) {
        throw new Error("Add Wishlist Failed")
      }
  
      redirect("/wishlist")
}
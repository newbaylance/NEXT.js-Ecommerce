"use server"

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";


export async function deleteCookies() {
    cookies().delete("Authorization")
    redirect("/login")
  }

export async function userIdHeaders() {
  try {
    const headersList = headers()
    const userIdHeader = headersList.get('x-user-id') as string

    return userIdHeader

  } catch (error) {
    console.log(error)
  }
}
    

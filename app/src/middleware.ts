import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose"
import { getUserByEmail } from "./db/models/user";

const SECRET = process.env.SECRET as string

export async function middleware(request:NextRequest) {
    "use server"
    try {
        const cookiesAuth = cookies().get("Authorization")

        if(!cookiesAuth) {
            throw new Error("Invalid Token")
        }

        let token = cookiesAuth.value.split(" ")[1]
        if(!token) {
            throw new Error("Invalid Token")
        }

        const secret = new TextEncoder().encode(SECRET)

        const decoded = await jose.jwtVerify<{_id: string; email: string}>(
            token,
            secret
        )

        console.log(decoded, "decodeddddddddddddddddddddddddd")
        const email = decoded.payload.email as string
        const id = decoded.payload._id as string

        const findUser = await getUserByEmail(email)
        if(!findUser) {
            throw new Error("Invalid Token")
        }

        const reqHeaders = new Headers(request.headers)
        reqHeaders.set("x-user-id", id)
        reqHeaders.set("x-user-emai", email)

        return NextResponse.next({
            request: {
                headers: reqHeaders
            }
        })

       
    } catch (error) {
        console.log(error, "errorrrrrrrrrrrrrrrrr")
        let status = 500
        let message = "Internal Server Error"

        if(error instanceof Error) {
            if(error.message) {
                status = 401
                message = error.message
            }
        }

        return NextResponse.json(
            { message, },
            { status, }
        )
    }
}

export const config = {
    matcher: ["/api/products"]
}

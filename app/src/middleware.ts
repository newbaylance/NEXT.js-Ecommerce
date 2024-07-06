import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose"
import { getUserByEmail, getUserById } from "./db/models/user";

const SECRET = process.env.SECRET as string

export async function middleware(request:NextRequest) {
    
    try {
        console.log("middleware alannnnnnnnnnnnn")
        const cookiesAuth = cookies().get("Authorization")

        if(!cookiesAuth) {
            // console.log('masuk if 1')
            throw new Error("Invalid Token")
        }

        let token = cookiesAuth.value.split(" ")[1]
        if(!token) {
            // console.log('masuk if 2')
            throw new Error("Invalid Token")
        }

        console.log('sampai')
        const secret = new TextEncoder().encode(SECRET)

        const decoded = await jose.jwtVerify<{_id: string; email: string}>(
            token,
            secret
        )

        // console.log('line 34')

        // console.log(decoded, "decodeddddddddddddddddddddddddd")
        const email = decoded.payload.email as string
        const userId = decoded.payload._id as string

        // const res = await fetch("http://localhost:3000/api/users")
        // const findUser = res.json()
        // console.log(findUser, "findUserrrrrrrrrrrrr")

        // const findUserById = await getUserById(userId)
        // console.log(findUserById)

        // const findUser = await getUserByEmail(email)
        // if(!findUser) {
        //     console.log('masuk if 3')

        //     throw new Error("Invalid Token")
        // }

        const reqHeaders = new Headers(request.headers)
        reqHeaders.set("x-user-id", userId)
        reqHeaders.set("x-user-email", email)

        console.log(`Middleware - New Headers: ${reqHeaders.get('x-user-id')}, ${reqHeaders.get('x-user-email')}`);

        const response = NextResponse.next({
            request: {
                headers: reqHeaders,
            },
        });

        return response
       
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
    matcher: ['/api/wishlists/:path*']
}

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose"
import { getUserByEmail } from "./db/models/user";

const SECRET = process.env.SECRET as string

export async function middleware(request:NextRequest) {
    
    try {
        console.log("middleware alannnnnnnnnnnnn")
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
        const userId = decoded.payload._id as string

        // const findUser = await getUserByEmail(email)
        // if(!findUser) {
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

        // if(request.nextUrl.pathname.startsWith("/api/wishlists")) {
        //     console.log("ini ke", request.nextUrl)
        // }
        // return NextResponse.next()
       
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
    matcher: ['/api/wishlists']
}

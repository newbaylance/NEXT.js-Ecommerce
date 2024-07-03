import { comparePassword } from "@/db/helpers/bcrypt"
import { signToken } from "@/db/helpers/jwt"
import { getUserByEmail } from "@/db/models/user"
import { NextResponse } from "next/server"
import { z } from "zod"


export async function POST(request: Request) {
    try {
        const body = await request.json()
        console.log(body, "<------- body")

        const User = z.object({
            email: z.string().email().nonempty("required"),
            password: z.string().min(5).nonempty("required")
        })
        .safeParse(body)

        if(!User.success) {
            throw User.error
        }

        const findUser = await getUserByEmail(body.email)


        if(!findUser) {
            return Response.json(
                {
                    message: `Invalid Email`
                },
                {
                    status: 401
                }
            )
        }

        const isValid = comparePassword(body.password, findUser.password)

        if(!isValid) {
            return Response.json(
                {
                    message: `Invalid Password`
                },
                {
                    status: 401
                }
            )
        }

        const access_token = signToken({ _id: findUser._id, email: findUser.email})

        const response = NextResponse.json({
            message: "Login Success",
            data: { access_token }
        })

        response.cookies.set("Authorization", `Bearer ${access_token}`)

        return response
    } catch (error) {
        console.log(error, "<------- errorrrrrrrr")
        if(error instanceof z.ZodError) {
            const errPath = error.issues[0].path[0]
            const errMessage = error.issues[0].message

            return Response.json(
                {
                    message: `${errPath} ${errMessage}`
                },
                {
                    status: 400
                }
            )
        }

        return Response.json(
            {
                message: `Internal Server Error`
            },
            {
                status: 500
            }
        )

    }
}
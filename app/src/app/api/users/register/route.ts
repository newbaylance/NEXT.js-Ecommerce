import { createUser, getUserByEmail, getUserByUsername } from "@/db/models/user";
import { z } from "zod";

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const parsedData = z.object({
            name: z.string().nonempty("required"),
            username: z.string().nonempty("required"),
            email: z.string().email().nonempty("required"),
            password: z.string().min(5).nonempty("required")
        })
        .safeParse(data)

        if(!parsedData.success) {
            throw parsedData.error
        }

        const findUsername = await getUserByUsername(data.username)
        if(findUsername) {
            return Response.json(
                {
                    message: "Username Must Be Unique",
                },
                {
                    status: 400,
                },
            )
        }

        const findEmail = await getUserByEmail(data.email)
        if(findEmail) {
            return Response.json(
                {
                    message: "Email Must Be Unique",
                },
                {
                    status: 400,
                },
            )
        }

        const newUser = await createUser(data)

        return Response.json(
        {
            message: "User created",
            data: newUser
        },
        {
            status: 201,
        },
    )

    } catch (error) {
        console.log(error)
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
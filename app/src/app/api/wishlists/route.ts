
import { createWishlist, deleteWishlist, getWishlistsByUserId } from "@/db/models/wishlist";
import { headers } from "next/headers";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
    try {
        const data = await request.json()
        console.log(data, "<------- data")


        const parsedData = z.object({
            userId: z.string().nonempty(),
            productId: z.string().nonempty()
        })
        .safeParse(data)

        if(!parsedData.success) {
            throw parsedData.error
        }


        const newWishlist = await createWishlist(data)

        return Response.json(
        {
            message: "Wishlist created",
            data: newWishlist
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



export async function GET(request: Request) {
    try {
        const headersList = headers()
        const userId = headersList.get('x-user-id');
        console.log(userId, "<------- data");

        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: 'User not found' }),
                { status: 400 }
            );
        }
        // const userId = "6684db1ecef8b71c240daa34"

        const allWishlists = await getWishlistsByUserId(userId);

        return Response.json(allWishlists)
        // return new NextResponse(
        //     JSON.stringify({
        //         message: `All Wishlists from userId ${"6684db1ecef8b71c240daa34"}`,
        //         data: allWishlists
        //     }),
        //     { status: 200 }
        // );
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { _id } = await request.json()
        console.log(_id, "<------- data")


        const deletedData = await deleteWishlist(_id)

        return Response.json(
            {
                message: "Wishlist Deleted",
                data: deletedData
            },
            {
                status: 200,
            },
        )
    } catch (error) {
        console.log(error);
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

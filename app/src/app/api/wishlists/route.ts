
import { createWishlist, deleteWishlist, findWishlist, getWishlistsByUserId } from "@/db/models/wishlist";
import { ObjectId } from "mongodb";
import { headers } from "next/headers";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
    try {
        const data = await request.json()
        console.log(data, "<------- data di route wishlist")

        const parsedData = z.object({
            userId: z.string().nonempty(),
            productId: z.string().nonempty()
        })
        .safeParse(data)

        if(!parsedData.success) {
            throw parsedData.error
        }

        
        const find = await findWishlist(new ObjectId(data.userId), new ObjectId(data.productId))
        // console.log(find, "masuk sini");


        if(find) {
            return Response.json(
                {
                    message: "This Product Already on Wishlist",
                },
                {
                    status: 400,
                }
            )
        } else {
            const newWishlist = await createWishlist({
                userId: data.userId,
                productId: data.productId,
                createdAt: new Date(),
                updatedAt: new Date()
            })
    
            return Response.json(
            {
                message: "Wishlist created",
                data: newWishlist
            },
            {
                status: 201,
            },
        )

        }



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
        const data = await request.json()
        console.log(data, "<------- data")

        const parsedData = z.object({
            userId: z.string().nonempty(),
            productId: z.string().nonempty()
        }).safeParse(data)

        if(!parsedData.success) {
            throw parsedData.error
        }


        const deletedData = await deleteWishlist(data.userId, data.productId)

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


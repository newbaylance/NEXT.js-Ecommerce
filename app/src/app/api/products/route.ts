import {  createProduct, getProduct } from "@/db/models/product";
import { z } from "zod";
const data = require("@/data.json")

export async function POST(request: Request) {
    try {
        const newProduct = await createProduct(data)
        // console.log(data[0], "<<<<<<<<<<<<<<<<");
        

        return Response.json(
        {
            message: "Product created",
            data: newProduct
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

export async function GET() {
    try {
        let allProducts = await getProduct()

        return Response.json(allProducts)
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
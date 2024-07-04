import { createProduct, getProduct } from "@/db/models/product";
import { z } from "zod";

export async function POST(request: Request) {
    try {
        const data = await request.json()
        console.log(data, "<------- data")


        const parsedData = z.object({
            name: z.string(),
            size: z.number(),
            description: z.string(),
            category: z.string(),
            imageUrl: z.string()
        })
        .safeParse(data)

        if(!parsedData.success) {
            throw parsedData.error
        }


        const newProduct = await createProduct(data)

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
        const allProducts = await getProduct()

        return Response.json(
            {
                message: "All Products",
                data: allProducts
            }
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
import { getProductBySlug } from "@/db/models/product"

 
 interface Props {
    params: {
        slug: string
    }
 }

 export async function GET(request: Request, { params } : Props) {
    const slug = params.slug
    console.log(slug, "sluggggggggggggggggggggg")

    const productBySlug = await getProductBySlug(slug)

    return Response.json(productBySlug)
 }
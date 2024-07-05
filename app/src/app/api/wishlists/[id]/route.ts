import { getProductBySlug } from "@/db/models/product"
import { deleteWishlist } from "@/db/models/wishlist"

 
 interface Props {
    params: {
        id: string
    }
 }

 export async function DELETE(request: Request, { params } : Props) {
    const id = params.id
    console.log(id, "idddddddddddddddddddd")

    const wishlistById = await deleteWishlist(id)

    return Response.json({
        message: `Message from /api/wishlists/${id}`,
        data: wishlistById
    })
 }
import { userIdHeaders } from "@/action"
import { ObjectId } from "mongodb"
import { headers } from "next/headers"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Swal from "sweetalert2"


interface Props {
  key: number
  product: {
    _id: ObjectId | string
    name: string
    slug: string
    description: string
    excerpt: string
    price: number
    tags: string[]
    thumbnail: string
    image: string[]
    createdAt: Date | string
    updatedAt: Date | string
  }
}

export default function Card(props: Props) {
  const router = useRouter()

  
    async function addWishlist (productId: string) {
      const userIdHeader = await userIdHeaders()

      // console.log(userIdHeader, "userId")
      // console.log(productId, "productId")

      if(!userIdHeader) {
        Swal.fire("You Must Login First")
      }
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userIdHeader,
          productId
        })
      })
  
      if(!response.ok) {
        Swal.fire("This Product Already on Wishlist")
      } else {
        router.push("/wishlist")
      }
    }
    return(
<div className="card bg-base-100 w-96 shadow-xl">
  <figure className="cursor-pointer" onClick={() => router.push(`/products/${props.product.slug}`)}>
    <img
      src={props.product.image[0]}
      alt={props.product.slug} />
  </figure>
  <div className="card-body">
    <h2 className="card-title cursor-pointer" onClick={() => router.push(`/products/${props.product.slug}`)}>{props.product.name}</h2>
    <p>{props.product.excerpt}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={() => addWishlist(props.product._id.toString())}>Add Wishlist</button>
    </div>
  </div>
</div>
    )
}
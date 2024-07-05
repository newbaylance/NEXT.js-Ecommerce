import { ObjectId } from "mongodb"
import { useRouter } from "next/navigation"
import { useState } from "react"


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
    createdAt: Date
    updatedAt: Date
  }
}

export default function Card(props: Props) {
  const router = useRouter()

  async function addWishlist (productId: string) {
    const response = await fetch("http://localhost:3000/api/wishlists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId
      })
    })

    if(!response.ok) {
      throw new Error("Add Wishlist Failed")
    }

    router.push("/wishlist")
  }
    return(
<div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={props.product.image[0]}
      alt={props.product.slug} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{props.product.name}</h2>
    <p>{props.product.excerpt}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={() => addWishlist(props.product._id.toString())}>Add Wishlist</button>
    </div>
  </div>
</div>
    )
}
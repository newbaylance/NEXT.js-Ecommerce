"use client"

import { ProductModel } from "@/db/models/product"
import { ObjectId } from "mongodb"
import { useEffect, useState } from "react"

interface WishlistModel {
    _id: ObjectId | string
    userId: ObjectId
    productId: ObjectId
    createdAt: Date
    updatedAt: Date
    product: ProductModel
}

export default function Wishlists() {
    const [wishlists, setWishlists] = useState<WishlistModel[]>([])

    async function getWishlists(): Promise<void> {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlists")

        if(!res.ok) {
            throw new Error("failed to fetch")
        }

        const data = await res.json()

        setWishlists(data)
    }

    async function deleteWishlist(userId: string, productId: string): Promise<void> {
        const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/wishlists/", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              userId,
              productId
            })
          })

        if(!res.ok) {
            throw new Error("failed to delete")
        }

        const data = await res.json()

        getWishlists()
    }

    useEffect(() => {
      getWishlists()
        // console.log(wishlists[0], "<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    }, [])

    return(
    <div className="container mx-auto px-4 mt-10 mb-10">
        <h1 className="font-bold">My Wishlist</h1> <br /> <br />
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>
                    No
                    </th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {/* row 1 */}
                {wishlists.map((el, i) => (
                    <tr key={el._id.toString()}>
                        <th>
                        <label>
                            {i + 1}
                        </label>
                        </th>
                        <td>
                        <div className="flex items-center gap-3">
                            <div className="avatar">
                            <div className="mask mask-squircle h-36 w-36">
                                <img
                                src={el.product.thumbnail}
                                alt={el.product.slug} />
                            </div>
                            </div>
                            <div>
                            <div className="font-bold">{el.product.name}</div>
                            <div className="text-sm opacity-50">{el.product.slug}</div>
                            </div>
                        </div>
                        </td>
                        <td>
                        {el.product.description}
                        <br />
                        <span className="badge badge-ghost badge-sm">tags: {el.product.tags[0]}, {el.product.tags[1]}, {el.product.tags[2]}</span>
                        </td>
                        <td>Rp{el.product.price.toLocaleString("id-ID")}</td>
                        <th>
                            <button className="btn btn-ghost btn-xs" onClick={() => deleteWishlist(el.userId.toString(),el.productId.toString())}>Delete</button>
                        </th>
                    </tr>
                ))}
                </tbody>
            </table>
         </div>
    </div>
    )
}
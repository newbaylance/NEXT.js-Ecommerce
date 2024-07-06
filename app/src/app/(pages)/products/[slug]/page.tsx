"use client"

import { ProductModel } from '@/db/models/product';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function ProductDetail() {
const params = useParams()
const router = useRouter()

const [product, setProduct] = useState<ProductModel>({
    _id: "",
    name: "",
    slug: "",
    description: "",
    excerpt: "",
    price: 0,
    tags: [],
    thumbnail: "",
    image: [],
    createdAt: "",
    updatedAt: ""
})

    async function getProducts(): Promise<void> {
        const res = await fetch("http://localhost:3000/api/products/" + params.slug)

        if(!res.ok) {
            throw new Error("failed to fetch")
        }

        const data = await res.json()

        console.log(data, "dataaaaaaaaaaaa");
        

        setProduct(data)
    }

    useEffect(() => {
      getProducts()
        // console.log(product, "<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    }, [])

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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
        <div className="flex flex-col md:flex-row">
            <div className="carousel carousel-vertical rounded-box h-96" style={{scrollbarWidth: "thin"}}>
                    {product.image.map((src, index) => (
                    <div className="carousel-item h-full">
                        <img key={index} src={src} alt={product.name} className="object-cover rounded-lg shadow-md" />
                    </div>
                    ))}  
            </div>
          <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
            <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold mb-6">Price: Rp{product.price.toLocaleString("id-ID")}</p>
            <div className="mb-6">
              {product.tags.map((tag, index) => (
                <span key={index} className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
            <button className="btn btn-primary" onClick={() => addWishlist(product._id.toString())}>
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

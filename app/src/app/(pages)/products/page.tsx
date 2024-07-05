"use client"

import Card from "@/components/Card";
import { ProductModel } from "@/db/models/product";
import { useEffect, useState } from "react";


export default function Products(){
    const [products, setProducts] = useState<ProductModel[]>([])

    async function getProducts(): Promise<void> {
        const res = await fetch("http://localhost:3000/api/products")

        if(!res.ok) {
            throw new Error("failed to fetch")
        }

        const data = await res.json()

        setProducts(data)
    }

    useEffect(() => {
      getProducts()
        // console.log(products[0], "<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    }, [])
    


    return(
        <div className="container mx-auto px-4 mt-10 mb-10">
        <div className="flex ...">
        <div className="flex-auto w-25 ...">
            <div className="join">
            <div>
                <div>
                <input className="input input-bordered join-item" placeholder="Search" />
                </div>
            </div>
            <div className="indicator">
                <button className="btn join-item">Search</button>
            </div>
            </div>
        </div>
        <div className="flex-auto w-75 ...">
            <div className="grid grid-cols-2 gap-4">
                {products.map((el, i) => (
                    <Card key={i} product={el}/>
                ))}
            </div>
        </div>
        </div>
        </div>
    )
}
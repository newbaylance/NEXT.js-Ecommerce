"use client"

import Card from "@/components/Card";
import { ProductModel } from "@/db/models/product";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 8;

export default function Products() {
    const [products, setProducts] = useState<ProductModel[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([])
    const [currentPage, setCurrentPage] = useState(1)

    async function getProducts(): Promise<void> {
        const res = await fetch("http://localhost:3000/api/products")

        if (!res.ok) {
            throw new Error("failed to fetch")
        }

        const data = await res.json()

        setProducts(data)
        setFilteredProducts(data)
    }

    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredProducts(filtered)
        setCurrentPage(1) 
    }, [searchTerm, products])

    
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem)

    
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)

    return (
        <div className="container mx-auto px-4 mt-10 mb-10">
            <div className="flex ...">
                <div className="flex-auto w-25 ...">
                    <div className="join">
                        <div>
                            <div>
                                <input
                                    className="input input-bordered"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="flex-auto w-75">
                    <div className="grid grid-cols-2 gap-4">
                        {currentProducts.map((el, i) => (
                            <Card key={i} product={el} />
                        ))}
                    </div>
                   
                    <div className="flex justify-center mt-8 mr-20">
                        <button
                            className="btn"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <span className="px-4 mt-3">{`Page ${currentPage} of ${totalPages}`}</span>
                        <button
                            className="btn"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

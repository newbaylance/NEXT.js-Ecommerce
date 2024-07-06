"use client"

import Card from "@/components/Card";
import { ProductModel } from "@/db/models/product";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ITEMS_PER_LOAD = 4;

export default function Products() {
    const [products, setProducts] = useState<ProductModel[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredProducts, setFilteredProducts] = useState<ProductModel[]>([])
    const [loadedProducts, setLoadedProducts] = useState<ProductModel[]>([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)

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
        setPage(1)
        setLoadedProducts(filtered.slice(0, ITEMS_PER_LOAD))
        setHasMore(filtered.length > ITEMS_PER_LOAD)
    }, [searchTerm, products])

    const fetchMoreData = () => {
        if (page * ITEMS_PER_LOAD >= filteredProducts.length) {
            setHasMore(false)
            return
        }
        setPage(page + 1)
        setLoadedProducts((prevLoadedProducts) => [
            ...prevLoadedProducts,
            ...filteredProducts.slice(page * ITEMS_PER_LOAD, (page + 1) * ITEMS_PER_LOAD)
        ])
    }

    return (
        <div className="container mx-auto px-4 mt-10 mb-10">
            <div className="flex ...">
                <div className="flex-auto w-25 ...">
                    <div className="join">
                        <div>
                            <div>
                                <input
                                    className="input input-bordered join-item"
                                    placeholder="Search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="indicator">
                            <button className="btn join-item" onClick={() => setSearchTerm(searchTerm)}>Search</button>
                        </div>
                    </div>
                </div>
                <div className="flex-auto w-75 ...">
                    <InfiniteScroll
                        dataLength={loadedProducts.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p className="mt-10" style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {loadedProducts.map((el, i) => (
                                <Card key={i} product={el} />
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    )
}

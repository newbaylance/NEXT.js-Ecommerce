import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
import { ProductModel } from "@/db/models/product";
import Image from "next/image";
import Link from "next/link";



async function getProducts(): Promise<ProductModel[]> {
  const res = await fetch("http://localhost:3000/api/products")

  if(!res.ok) {
      throw new Error("failed to fetch")
  }

  const data = await res.json()

  return data
}

export default async function Home() {
  const products = await getProducts()

  return (
  <>
    <div>
      <Hero/>
    </div>
    <div className="m-4">
      <Link href={"/products"} className="flex items-center justify-end font-bold mt-4 mb-2 text-base underline hover:no-underline">See all products</Link>
    </div>
    <div className="w-full carousel carousel-center bg-white rounded-box space-x-4 p-4" style={{ scrollbarWidth: "auto" }}>
      {products.map ((el, i) => (
        <Carousel key={i + 1} product={el}/>
      ))}
    </div>
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
          className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Box Office News!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
    
  </>
  );
}

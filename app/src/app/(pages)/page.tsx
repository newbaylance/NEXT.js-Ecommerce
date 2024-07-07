import Carousel from "@/components/Carousel";
import Hero from "@/components/Hero";
import { ProductModel } from "@/db/models/product";
import Link from "next/link";

export async function getProducts(): Promise<ProductModel[]> {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/products", {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const data = await res.json();
  return data;
}

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="m-4">
        <Link href={"/products"} className="flex items-center justify-end font-bold mt-4 mb-2 text-base underline hover:no-underline">
          See all products
        </Link>
      </div>
      <div className="w-full carousel carousel-center bg-white rounded-box space-x-4 p-4" style={{ scrollbarWidth: "auto" }}>
        {products.map((el, i) => (
          <Carousel key={i + 1} product={el} />
        ))}
      </div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://i.pinimg.com/736x/d2/78/98/d27898254f31b2045ed4177c5195f932.jpg"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Our Mission</h1>
            <p className="py-6">
              "At Tirta Shoes Store, We don't feel bound by limitations,
              We feel the excitement and excitement of trying something new and unknown.
              That's why we continue to innovate and explore urban fashion styles,
              every detail is created with great care to bring an exciting experience to your movement."
            </p>
            <h3>dr. Tirta Mandira Hudhi, CEO Tirta Shoes Store</h3>
          </div>
        </div>
      </div>
    </>
  );
}

"use server"


import WishlistButton from '@/components/WishlistButton';
import { ProductModel } from '@/db/models/product';
import { cookies } from 'next/headers';

async function getProducts(filter: string): Promise<ProductModel> {
    const res = await fetch("http://localhost:3000/api/products/" + filter, {
      headers: {
        Cookie: cookies().toString()
      }
    })

    if(!res.ok) {
        throw new Error("failed to fetch")
    }

    const data = await res.json()

    console.log(data, "dataaaaaaaaaaaa");
    

    return data
}

interface Props {
  params: {slug: string}
}

export async function ProductDetail({params}: Props) {
const product = await getProducts(params.slug)

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
            <WishlistButton productId={product._id.toString()}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

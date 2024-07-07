"use server";

import WishlistButton from '@/components/WishlistButton';
import { ProductModel } from '@/db/models/product';
import { cookies } from 'next/headers';
import type { Metadata, ResolvingMetadata } from 'next';

// Define the parameters interface
interface Params {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: Params,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.slug;

  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${id}`, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  if (!res.ok) {
    throw new Error('failed to fetch');
  }

  const product = await res.json();

  return {
    title: product.name,
    description: product.description,
  };
}

async function getProducts(filter: string): Promise<ProductModel> {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `/api/products/${filter}`, {
    headers: {
      Cookie: cookies().toString(),
    },
  });

  if (!res.ok) {
    throw new Error('failed to fetch');
  }

  const data = await res.json();
  return data;
}

interface ProductDetailProps {
  params: { slug: string };
}

const ProductDetail = async ({ params }: ProductDetailProps): Promise<JSX.Element> => {
  const product = await getProducts(params.slug);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
        <div className="flex flex-col md:flex-row">
          <div className="carousel carousel-vertical rounded-box h-96" style={{ scrollbarWidth: 'thin' }}>
            {product.image.map((src: string, index: number) => (
              <div key={index} className="carousel-item h-full">
                <img src={src} alt={product.name} className="object-cover rounded-lg shadow-md" />
              </div>
            ))}
          </div>
          <div className="md:w-1/2 md:pl-6 mt-6 md:mt-0">
            <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-xl font-semibold mb-6">Price: Rp{product.price.toLocaleString('id-ID')}</p>
            <div className="mb-6">
              {product.tags.map((tag: string, index: number) => (
                <span key={index} className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  #{tag}
                </span>
              ))}
            </div>
            <WishlistButton productId={product._id.toString()} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

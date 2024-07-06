import { ObjectId } from "mongodb"

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
    createdAt: Date | string
    updatedAt: Date | string
  }
}

export default function Carousel(props: Props) {

    return (

  <div className="carousel-item flex flex-col items-center ">
    <img
      src={props.product.image[0]}
      alt={props.product.slug}
      className="object-cover w-96 h-64 rounded-lg shadow-md"
    />
    <div className="mt-2 text-center">
      <h2 className="text-lg font-semibold">{props.product.name}</h2>
    </div>
  </div>


  


    )
}
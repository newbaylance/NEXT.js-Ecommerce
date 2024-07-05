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
    createdAt: Date
    updatedAt: Date
  }
}

export default function Card(props: Props) {
    return(
<div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={props.product.image[0]}
      alt={props.product.slug} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{props.product.name}</h2>
    <p>{props.product.excerpt}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Add Wishlist</button>
    </div>
  </div>
</div>
    )
}
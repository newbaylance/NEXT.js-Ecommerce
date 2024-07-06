import { ObjectId } from "mongodb";
import { connect, getDB } from "../config";


const COLLECTION_PRODUCT = "products"

export interface ProductModel {
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




// export const createProduct = async (product: ProductModel[]) => {
//     const db = await getDB()

//     const productsAll = product.map(p => ({
//         ...p,
//         createdAt: new Date(),
//         updatedAt: new Date()
//     }))
//     // console.log(productsAll[0], "<----- di modellll")

//     const newProduct = await db.collection(COLLECTION_PRODUCT).insertMany(productsAll)

//     return newProduct
// }

export const getProduct = async () => {
    const db = await getDB()
    const getProducts = await db.collection(COLLECTION_PRODUCT).find().toArray()

    return getProducts
}

export const getProductBySlug = async (slug: string) => {
    const db = await getDB()
    const data = await db.collection(COLLECTION_PRODUCT).findOne({slug})

    return data
}
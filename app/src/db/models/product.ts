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
    image: string
    createdAt: Date
    updatedAt: Date
}


export type ProductModelInput = Omit<ProductModel, "_id">

export const createProduct = async (product: ProductModelInput) => {
    const db = await getDB()
    const modifiedProduct: ProductModelInput = {
        ...product,
    }

    const newProduct = await db.collection(COLLECTION_PRODUCT).insertOne(modifiedProduct)

    return newProduct
}

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
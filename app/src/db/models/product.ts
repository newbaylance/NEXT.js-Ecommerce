import { ObjectId } from "mongodb";
import { connect, getDB } from "../config";


const COLLECTION_PRODUCT = "products"

export interface ProductModel {
    _id: ObjectId | string
    name: string
    size: number
    description: string
    category: string
    imageUrl: string
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
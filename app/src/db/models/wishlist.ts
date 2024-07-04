import { ObjectId } from "mongodb";
import { connect, getDB } from "../config";


const COLLECTION_WISHLIST = "wishlists"

export interface WishlistModel {
    _id: ObjectId
    userId: ObjectId
    productId: ObjectId
    createdAt: Date
    updatedAt: Date
}


export type WishlistModelInput = Omit<WishlistModel, "_id">

export const createWishlist = async (wishlist: WishlistModelInput) => {
    const db = await getDB()
    const modifiedWishlist: WishlistModelInput = {
        userId: new ObjectId(wishlist.userId),
        productId: new ObjectId(wishlist.productId),
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const newWishlist = await db.collection(COLLECTION_WISHLIST).insertOne(modifiedWishlist)

    return newWishlist
}

export const getWishlistsByUserId = async(userId: string) => {
    const db = await getDB()
    const getWishlists = await db.collection<WishlistModelInput>(COLLECTION_WISHLIST)
    .aggregate(
        [
            {
              '$lookup': {
                'from': 'products', 
                'localField': 'productId', 
                'foreignField': '_id', 
                'as': 'product'
              }
            }, {
              '$unwind': {
                'path': '$product', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$match': {
                'userId': new ObjectId(userId)
              }
            }
          ]
    )
    .toArray()

    return getWishlists
}

export const deleteWishlist = async(_id: string) => {
    const db = await getDB()
    const deleteWishlist = await db.collection(COLLECTION_WISHLIST).deleteOne({_id: new ObjectId(_id)})

    return deleteWishlist
}
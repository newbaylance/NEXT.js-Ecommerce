import { ObjectId } from "mongodb";
import { connect, getDB } from "../config";
import { hashPassword } from "../helpers/bcrypt";


const COLLECTION_USER = "users"

export interface UserModel {
    _id: ObjectId | string
    name: string
    username: string
    email: string
    password: string
}

export type UserModelInput = Omit<UserModel, "_id">

export const createUser = async (user: UserModelInput) => {
    const db = await getDB()
    const modifiedUser: UserModelInput = {
        ...user,
        password: hashPassword(user.password)
    }

    const newUser = await db.collection(COLLECTION_USER).insertOne(modifiedUser)

    return newUser
}

export const getUserByEmail = async (email: string) => {
    const db = await getDB()

    const findUser = await db.collection(COLLECTION_USER).findOne({email})

    return findUser
}

export const getUserById = async (_id: string) => {
    const db = await getDB()

    const findUser = await db.collection(COLLECTION_USER).findOne({_id: new ObjectId(_id)})

    return findUser
}

export const getUserByUsername = async (username: string) => {
    const db = await getDB()

    const findUser = await db.collection(COLLECTION_USER).findOne({username})

    return findUser
}

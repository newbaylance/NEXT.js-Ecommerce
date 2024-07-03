import { ObjectId } from "mongodb";
import { connect, getDB } from "../config";
import { hashPassword } from "../helpers/bcrypt";

const COLLECTION_USER = "users"

export interface UserModel {
    _id: ObjectId
    name: string
    username: string
    email: string
    password: string
}

export type UserModelInput = Omit<UserModel, "_id">
export type LoginModelInput = Omit<UserModel, "_id" | "name" | "username">

export const createUser = async (user: UserModelInput) => {
    const db = await getDB()
    const modifiedUser: UserModelInput = {
        ...user,
        password: hashPassword(user.password)
    }

    const newUser = await db.collection(COLLECTION_USER).insertOne(modifiedUser)

    return newUser
}

export const getUserByEmail = async (user: LoginModelInput) => {
    const db = await getDB()

    const findUser = await db.collection(COLLECTION_USER).findOne({email: user.email}, {projection: {password: 0}}) as UserModel

    return findUser
}


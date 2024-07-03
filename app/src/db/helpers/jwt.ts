import { ObjectId } from "mongodb"

const jwt = require("jsonwebtoken")


const secret = "12345"

export const signToken = (payload: {_id: ObjectId | string, email: string}): void => {
    return jwt.sign(payload, secret)
}

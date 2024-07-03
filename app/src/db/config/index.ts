import { MongoClient } from "mongodb"
const uri = "mongodb+srv://bayubahruddin:d9BmPdBTlzJPPDDa@cluster0.s5yksvl.mongodb.net/"

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

export async function connect() {
  try {
    client.db("challenge2")
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    await client.close();
  }
}

export async function getDB() {
  return client.db("challenge2");
}




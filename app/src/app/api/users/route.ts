import { getUserById } from "@/db/models/user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";



export async function GET() {
    const headersList = headers()
    const userId = headersList.get('x-user-id');
    console.log(userId, "<------- data");
    try {
        if (!userId) {
            return new NextResponse(
                JSON.stringify({ message: 'User not found' }),
                { status: 400 }
            );
        }
        // const userId = "6684db1ecef8b71c240daa34"

        const user = await getUserById(userId);

        return Response.json(user)

    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: 'Internal Server Error' }),
            { status: 500 }
        );
    }
}
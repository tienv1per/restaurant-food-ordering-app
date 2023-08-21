import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"

const prisma = new PrismaClient();

// fetching all categories
export const GET = async() => {
    try {
        const categories = await prisma.category.findMany();
        return new NextResponse(JSON.stringify(categories), {status: 200})
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({message: "Something went wrong"}), {status: 500});
    }
    
}
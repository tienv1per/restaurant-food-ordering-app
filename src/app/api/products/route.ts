import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server"

// fetching all products
export const GET = async(req: NextRequest) => {
    const {searchParams} = new URL(req.url);
    // url: localhost:3000/api/products?cat="pizza"
    const cat = searchParams.get("cat");

    try {
        const products = await prisma.product.findMany({
            where: {
                // su dung spread de loai bo dau {}
                ...(cat ? {catSlug: cat} : {isFeatured: true})
            }
        });
        return new NextResponse(JSON.stringify(products), {status: 200})
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({message: "Something went wrong"}), {status: 500});
    }
};

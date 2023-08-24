import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: {
        id: string;
    }
};

export const PUT  = async(req:NextRequest, params: Params) => {
    const id = params.params.id;

    try {
        const body = await req.json();

        await prisma.order.update({
            where: {
                id: id,
            },
            data: {
                status: body as string,
            },
        });
        return new NextResponse(JSON.stringify({message: "Order has been updated"}), {status: 200});
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({message: "Something went wrong"}), {status: 500});
    }
};
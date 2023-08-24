import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    params: {
        id: string;
    }
};

// GET single product
export const GET = async (req: NextRequest, { params }: Params) => {
	const id = params.id;

	try {
		const product = await prisma.product.findUnique({
			where: {
				id: id,
			},
		});

		return new NextResponse(JSON.stringify(product), { status: 200 });
	} catch (err) {
		console.log(err);
		return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), { status: 500 });
	}
};
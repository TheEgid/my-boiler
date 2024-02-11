import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/services/db";

// GET /api/image
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        const imgs = await prisma.image.findMany({ include: { album: true }, orderBy: [{ imageName: "asc" }] });
        res.json(imgs);
    } else {
        res.status(405).send({ message: "Method not allowed" });
    }
};

export default handler;

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "src/db";

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const tasks = await prisma.task.findMany({ orderBy: [{ id: "asc" }] });
        res.json(tasks);
    } catch (error) {
        res.status(500).json(error);
    }
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const transmitParams = { ...req.body };
    try {
        const tasks = await prisma.task.create({ data: { ...transmitParams, completed: false } });
        res.json(tasks);
    } catch (error) {
        res.status(500).json(error);
    }
};

// POST /api/task
// GET /api/task
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        await getHandler(req, res);
    } else if (req.method === "POST") {
        await postHandler(req, res);
    } else {
        res.status(405).send({ message: "Method not allowed" });
    }
};

export default handler;

import { type NextApiRequest, type NextApiResponse } from "next";
import prisma from "src/database-connector";

const getHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    const clearString = (inputString: string): string =>
        inputString
            .replace(/[^a-zA-Zа-яА-Я0-9 ]+/g, " ")
            .replace(/\s+/g, " ")
            .trim();

    try {
        const tasks = await prisma.task.findMany({ orderBy: [{ id: "asc" }] });
        res.json(tasks);
    } catch (error) {
        res.status(500).json(error);
    }
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
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
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method === "GET") {
        await getHandler(req, res);
    } else if (req.method === "POST") {
        await postHandler(req, res);
    } else {
        res.status(405).send({ message: "Method not allowed" });
    }
};

export default handler;

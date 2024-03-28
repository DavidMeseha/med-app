import dbConnect from "@/lib/dbConnection";
import Users from "@/models/Users";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    dbConnect()
    let users = await Users.find({ role: 'user' }).exec()
    res.status(200).json(users);
};

export default handler;
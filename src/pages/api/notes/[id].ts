import dbConnect from "@/lib/dbConnection";
import Users from "@/models/Users";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let { id } = req.query
    dbConnect()

    let user = await Users.findById(id).exec()

    if (user) {
        return res.status(200).json(user.notes || [])
    }

    return res.status(400).json('no user')
};

export default handler;
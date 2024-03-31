import dbConnect from "@/lib/dbConnection";
import Users from "@/models/Users";
import cryptoJS from "crypto-js";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
};

const encryptionKey = process.env.ENCRYPTION_KEY

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { name, email, password, role } = req.body

    let encryptedPass = cryptoJS.AES.encrypt(password.toString(), encryptionKey as string).toString()

    await dbConnect()

    let found = await Users.findOne({ email: email }).exec()
    if (found) return res.status(402).json({ message: "Email already regesstered" });

    let result = await Users.insertMany([{ name, email, password: encryptedPass, role, notes: [], isLogin:false }])
    if (result) return res.status(200).json({ message: "Account Created" });
    else return res.status(500).json({ message: "Fail" });
};

export default handler;
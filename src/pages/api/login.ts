import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken'
import Users from "@/models/Users";
import CryptoJS from "crypto-js";
import dbConnect from "@/lib/dbConnection";
import { parseCookies } from "@/utility/parseCookies";

const secretKey = process.env.ACCESS_TOKEN_SECRET
const encryptionKey = process.env.ENCRYPTION_KEY

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Handle login and access token check for automatic login
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body
    const cookies: { name: string, value: string }[] = parseCookies(req.headers.cookie as string)
    let user: any
    let id: string = ''
    let isLoggedin = false

    let accessToken = cookies.find((cookie) => {
        return cookie.name === 'access'
    })?.value

    await dbConnect()

    if (accessToken) {
        try {
            let userPayload: any = jwt.verify(accessToken, secretKey as string)
            user = await Users.findOne({ email: userPayload.email }).exec()
            isLoggedin = user.isLogin
        } catch (e) { }

        if (!isLoggedin) user = null
        if (user) id = user?.id
    }

    if (!user) {
        if (!email || !password) return res.status(401).json('Not Verefied')

        user = await Users.findOne({ email: email }).exec()
        if (!user) return res.status(404).json({ message: "Email Not Found" });

        let decryptedPass = CryptoJS.AES.decrypt(user.password, encryptionKey as string).toString(CryptoJS.enc.Utf8)
        if (decryptedPass !== password) return res.status(401).json({ message: "Wrong Password" });

        await Users.findOneAndUpdate({ email: user.email }, { isLogin: true })
        id = user._id
    }

    let token = jwt.sign({ email: user.email, name: user.name, role: user.role, id }, secretKey as string, { expiresIn: 60 * 60 * 24 })

    res.setHeader('Set-Cookie', [`access=${token}; max-age=${60 * 60 * 24}`])
    return res.status(200).json({ email: user.email, name: user.name, role: user.role, id });
};

export default handler;
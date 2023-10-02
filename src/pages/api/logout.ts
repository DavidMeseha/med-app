import jwt from 'jsonwebtoken';
import Users from "@/models/Users";
import type { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from '@/utility/parseCookies';

const secretKey = process.env.ACCESS_TOKEN_SECRET

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const cookies: { name: string, value: string }[] = parseCookies(req.headers.cookie as string)
    let user: any

    let accessToken = cookies.find((cookie) => {
        return cookie.name === 'access'
    })?.value

    if(!accessToken) return res.status(400).json('nothing to do');

    user = jwt.verify(accessToken, secretKey as string)
    
    await Users.findOneAndUpdate({email: user.email},{isLogin: false})
    return res.status(200).json('logged out');
};

export default handler;
import jwt from 'jsonwebtoken';
import { parseCookies } from "@/utility/parseCookies";
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from '@/context/UserContext';

type Data = {
    message: string;
};

const secretKey = process.env.ACCESS_TOKEN_SECRET

const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const cookies: { name: string, value: string }[] = parseCookies(req.headers.cookie as string)
    let user: User | null = null
 
    let accessToken = cookies.find((cookie) => {
        return cookie.name === 'access'
    })?.value

    if (accessToken) {
        try {
            user = jwt.verify(accessToken, secretKey as string) as User
        }catch(e){
            user = null
        }
    }

    if(!user) return res.status(402).json({ message: "Not Verified" });

    let token = jwt.sign({ email: user.email, name: user.name, role: user.role, id:user.id }, secretKey as string, { expiresIn: 60 * 2 })

    res.setHeader('Set-Cookie', [`access=${token}; HttpOnly; max-age=${60 * 2}`])  
    return res.status(200).json({ message: "Verified" });
};

export default handler;
import Users from "@/models/Users";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";
import { parseCookies } from "./parseCookies";

const secretKey = process.env.ACCESS_TOKEN_SECRET;

export default async (req: NextApiRequest) => {
  const cookies: { name: string; value: string }[] = parseCookies(
    req.headers.cookie as string
  );
  const accessToken = cookies.find((cookie) => {
    return cookie.name === "access";
  })?.value as string;

  const userPayload: any = jwt.verify(accessToken, secretKey as string);
  const user = await Users.findOne({ email: userPayload.email }).exec();
  const isLoggedin = user.isLogin;

  if (!isLoggedin || !user) return null;
  return user;
};

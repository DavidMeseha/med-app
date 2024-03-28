import dbConnect from "@/lib/dbConnection";
import Users from "@/models/Users";
import getUserFromToken from "@/utility/getUserFromToken";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await getUserFromToken(req);
  if (!user || user.role !== "user")
    return res.status(401).json("unauthorized");

  await dbConnect();

  const userFound = await Users.findById(user.id).exec();
  if (userFound) return res.status(200).json(user.notes || []);
  return res.status(400).json("no user");
};

export default handler;

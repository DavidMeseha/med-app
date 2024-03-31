import dbConnect from "@/lib/dbConnection";
import Users from "@/models/Users";
import getDataFromToken from "@/utility/getUserFromToken";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { to, comment } = req.body;
  const doctor = await getDataFromToken(req);
  
  if (!doctor || doctor.role !== "doctor")
    return res.status(401).json("unauthorized");

  const foundDoctor = await Users.findById(doctor.id).exec();

  if (!to || !foundDoctor || !comment)
    return res.status(500).json("Failed To Add");

  dbConnect();
  const user = await Users.findById({ _id: to });
  const notes = user.notes || [];

  notes.push({
    doctor: { id: foundDoctor._id, name: foundDoctor.name },
    date: new Date(),
    body: comment,
  });

  await Users.findOneAndUpdate({ email: user.email }, { notes: notes });
  return res.status(200).json("added");
};

export default handler;

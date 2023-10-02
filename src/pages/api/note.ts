import dbConnect from "@/lib/dbConnection";
import Users from "@/models/Users";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { doctor:docId, to, comment } = JSON.parse(req.body)
    let notes

    let doctor = await Users.findById(docId).exec()
    console.log(doctor)

    if (!to || !doctor || !comment) return res.status(500).json('added');
    console.log(to, doctor)

    dbConnect()
    let user = await Users.findById({ _id: to })
    notes = user.notes || []

    notes.push({
        doctor: { id: doctor._id, name: doctor.name },
        date: new Date(),
        body: comment
    })

    await Users.findOneAndUpdate({ email: user.email }, { notes: notes })
    return res.status(200).json('added');
};

export default handler;
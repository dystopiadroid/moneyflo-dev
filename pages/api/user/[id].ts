import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  if (!id) {
    return res.status(400).json("User ID is not present");
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(400).json("User doesn't exist in the Database");
    }
    return res.json(user);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return res.json(err.message);
    }
    return res.json(err);
  }
}

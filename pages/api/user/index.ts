import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json("Name or Email not present to add User");
    }
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      if (!user) {
        return res.status(400).json("User not created");
      }
      return res.json(user);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.json(err.message);
      }
      return res.json(err);
    }
  } else if (req.method == "GET") {
    const { email } = req.query as Partial<{ [key: string]: string }>;
    if (!email) {
      return res.status(400).json("Email not present");
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return res.json(null);
      }
      return res.json(user);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.json(err.message);
      }
      return res.json(err);
    }
  }
}

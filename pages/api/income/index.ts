import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface IncomeRequest {
  title: string;
  amount: string;
  date: Date;
  user_id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { title, amount, date, user_id: userId }: IncomeRequest = req.body;
    if (!title || !amount || !date || !userId) {
      return res.status(400).json("Fill out all the fields before submitting!");
    }
    const regex = /^[0-9]+$/;
    if (!regex.test(amount)) {
      return res.status(400).json("Amount should only contain numeric value");
    }
    console.info("Before try block");
    try {
      console.info("After try block");
      const income = await prisma.income.create({
        data: {
          title,
          amount,
          date,
          user_id: userId,
        },
      });
      console.info("After income creation : ", income);
      if (!income) {
        return res.status(400).json("Income not created");
      }
      return res.status(201).json(income);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(404).json(err.message);
      }
      return res.status(404).json(err);
    }
  }
}

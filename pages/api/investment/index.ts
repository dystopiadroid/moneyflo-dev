import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface InvestmentRequest {
  title: string;
  category: string;
  amount: string;
  date: Date;
  user_id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const {
      title,
      category,
      amount,
      date,
      user_id: userId,
    }: InvestmentRequest = req.body;
    if (!title || !category || !amount || !date || !userId) {
      return res.status(400).json("Fill out all the fields before submitting!");
    }
    const regex = /^[0-9]+$/;
    if (!regex.test(amount)) {
      return res.status(400).json("Amount should only contain numeric value");
    }
    try {
      const investment = await prisma.investment.create({
        data: {
          title,
          category,
          amount,
          date,
          user_id: userId,
        },
      });
      if (!investment) {
        return res.status(400).json("Investment not created");
      }
      return res.status(201).json(investment);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(404).json(err.message);
      }
      return res.status(404).json(err);
    }
  }
}

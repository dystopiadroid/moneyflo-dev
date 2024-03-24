import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface ExpenseRequest {
  description: string;
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
      description,
      category,
      amount,
      date,
      user_id: userId,
    }: ExpenseRequest = req.body;
    if (!description || !category || !amount || !date || !userId) {
      return res.status(400).json("Fill out all the fields before submitting!");
    }
    const regex = /^[0-9]+$/;
    if (!regex.test(amount)) {
      return res.status(400).json("Amount should only contain numeric value");
    }
    try {
      const expense = await prisma.expense.create({
        data: {
          description,
          category,
          amount,
          date,
          user_id: userId,
        },
      });
      if (!expense) {
        return res.status(400).json("Expense not created");
      }
      return res.status(201).json(expense);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(404).json(err.message);
      }
      return res.status(404).json(err);
    }
  }
}

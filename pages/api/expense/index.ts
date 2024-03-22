import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == "POST") {
    const { description, category, amount, date, user_id: userId } = req.body;
    if (!description || !category || !amount || !date || !userId) {
      return res
        .status(400)
        .json("Req Body parameters are not present to add Expense");
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
      return res.json(expense);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.json(err.message);
      }
      return res.json(err);
    }
  }
}

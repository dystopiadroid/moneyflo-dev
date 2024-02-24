import WelcomePage from "@/components/welcome/WelcomePage";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useSession } from "next-auth/react";
import Income from "../containers/income";
import Investment from "../containers/investment";
import Expense from "../containers/expense";
import { setCurrentPage } from "@/lib/features/pageSlice";
import Loader from "./loader";

export default function Home() {
  const { data: session, status } = useSession();
  const currentPage = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();

  if (status === "loading") {
    return (
      <div className="h-content flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="h-content flex justify-center items-center">
        <WelcomePage />
      </div>
    );
  }

  if (session && currentPage === "init") {
    dispatch(setCurrentPage("expense"));
  }

  switch (currentPage) {
    case "income":
      return <Income />;
    case "investment":
      return <Investment />;
    case "expense":
      return <Expense />;
    default:
      return <Income />;
  }
}

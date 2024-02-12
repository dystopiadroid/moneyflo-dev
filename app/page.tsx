import WelcomePage from "@/components/welcome/WelcomePage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="h-content flex justify-center items-center">
        <WelcomePage />
      </div>
    );
  }

  return redirect("/income");
}

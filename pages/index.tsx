import WelcomePage from "@/components/welcome/WelcomePage";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="h-content flex justify-center items-center">
        <WelcomePage />
      </div>
    );
  }

  return "";
}

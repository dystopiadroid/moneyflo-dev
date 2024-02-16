"use client";

import { setCurrentPage } from "@/lib/features/pageSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={() =>
        signIn("google").then(() =>
          setTimeout(() => {
            dispatch(setCurrentPage("income"));
          }, 3000)
        )
      }
      className="ml-5 rounded-full bg-primary-400"
    >
      <span className="font-bold text-google">Log in with Google</span>
    </Button>
  );
}

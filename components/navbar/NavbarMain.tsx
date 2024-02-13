"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { Button } from "@nextui-org/button";
import { IoExit } from "react-icons/io5";
import { signOut } from "next-auth/react";
import { useToast } from "../ui/use-toast";

function NavbarMain({ session }: { session: Session | null }) {
  const [activeTab, setActiveTab] = useState("");
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    setActiveTab(pathname.substring(1, pathname.length));
  }, [pathname]);

  const headerNameTransform = (name: string | null | undefined) => {
    if (name) {
      if (name.search(" ") !== -1) {
        return `${name.substring(0, name.indexOf(" "))}'s Tracker`;
      } else {
        return `${name}'s Tracker`;
      }
    }
    return "";
  };

  return (
    <Navbar
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary-400",
        ],
      }}
    >
      <NavbarBrand>
        <Link className="font-bold text-white hover:cursor-pointer">
          <p
            className="font-bold text-inherit text-2xl"
            onClick={() => toast({ title: "Hello" })}
          >
            {session ? headerNameTransform(session.user?.name) : "MoneyFlo"}
          </p>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden text-lg gap-9 sm:flex " justify="center">
        <NavbarItem isActive={activeTab === "income"}>
          <Link color="foreground" href="income">
            Incomes
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeTab === "investment"}>
          <Link color="foreground" href="investment">
            Investments
          </Link>
        </NavbarItem>
        <NavbarItem isActive={activeTab === "expense"}>
          <Link color="foreground" href="expense">
            Expenses
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="https://github.com/dystopiadroid">
            <img src="github.svg" className="h-10 w-10 invert"></img>
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="https://www.linkedin.com/in/balaji-pj-ba8a83217/">
            <img src="linkedin.svg" className="h-12 w-12"></img>
          </Link>
        </NavbarItem>
        {session && (
          <NavbarItem>
            <Button
              color="danger"
              className="font-bold text-1xl"
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              <span>Logout</span>
              <IoExit className="text-2xl" />
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarMain;

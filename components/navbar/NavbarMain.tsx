import React, { Suspense, useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCurrentPage } from "@/lib/features/pageSlice";

function NavbarMain() {
  const [activeTab, setActiveTab] = useState("");
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.page);
  const { data: session, status } = useSession();

  useEffect(() => {
    setActiveTab(currentPage);
  }, [currentPage]);

  if (status === "loading") {
    return "";
  }

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
        <div className="font-bold text-white hover:cursor-pointer">
          <p className="font-bold text-inherit text-2xl">
            {session ? headerNameTransform(session.user?.name) : "MoneyFlo"}
          </p>
        </div>
      </NavbarBrand>
      <NavbarContent className="hidden text-lg gap-9 sm:flex " justify="center">
        <NavbarItem
          isActive={activeTab === "expense"}
          onClick={
            session ? () => dispatch(setCurrentPage("expense")) : undefined
          }
          className="hover:cursor-pointer"
        >
          Expenses
        </NavbarItem>
        <NavbarItem
          isActive={activeTab === "income"}
          onClick={
            session ? () => dispatch(setCurrentPage("income")) : undefined
          }
          className="hover:cursor-pointer"
        >
          Incomes
        </NavbarItem>
        <NavbarItem
          isActive={activeTab === "investment"}
          onClick={
            session ? () => dispatch(setCurrentPage("investment")) : undefined
          }
          className="hover:cursor-pointer"
        >
          Investments
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
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}

export default NavbarMain;

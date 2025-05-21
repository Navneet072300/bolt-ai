/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";

const Header = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="p-4 flex items-center justify-between">
      <Image
        src={"/logo.png"}
        priority
        alt="logo"
        width={40}
        height={40}
        className="bg-white p-1.5 rounded-lg m-2"
      />
      {!userDetail?.name && (
        <div className="flex gap-5">
          <Button className="" variant={"ghost"}>
            Sign In
          </Button>
          <Button className="text-white bg-blue-700 hover:bg-blue-500">
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;

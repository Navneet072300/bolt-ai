import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Header = () => {
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
      <div className="flex gap-5">
        <Button className="" variant={"ghost"}>
          Sign In
        </Button>
        <Button className="text-white bg-blue-700 hover:bg-blue-500">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Header;

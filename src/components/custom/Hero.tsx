"use client";
import Lookup from "@/data/Lookup";
import React, { useContext, useState } from "react";
import { ArrowRight, Link } from "lucide-react";
import { MessagesContext } from "@/context/MessageContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import SignInDialog from "./SignInDialog";

const Hero = () => {
  const [userInput, setUserInput] = useState<string>("");
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);

  const onGenerate = (input: string) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }

    setMessages({
      role: "user",
      content: input,
    });
  };

  return (
    <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>

      <div className=" bg-[#101923] p-5 border rounded-xl max-w-xl w-full mt-3">
        <div className="flex gap-3">
          <textarea
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={Lookup.INPUT_PLACEHOLDER}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize"
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-10 w-10 rounded-md cursor-pointer"
            />
          )}
        </div>
        <div className="">
          <Link className="h-5 w-5" />
        </div>
      </div>

      <div className="flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-2">
        {Lookup?.SUGGSTIONS.map((suggestion, index) => (
          <h2
            className="p-1 px-2 border rounded-full text-sm
          text-gray-400 hover:text-white cursor-pointer transition transform-3di"
            key={index}
            onClick={() => onGenerate(suggestion)}
          >
            {suggestion}
          </h2>
        ))}
      </div>
      <SignInDialog
        openDialog={openDialog}
        closeDialog={(e: boolean) => setOpenDialog(e)}
      />
    </div>
  );
};

export default Hero;

import Image from "next/image";
import React from "react";
import NoUser from "../../../assets/no-user.jpg";
import { Logout } from "@/icons/icons";

const AsideHeader = ({ session, _logout }) => {
  return (
    <>
      {session ? (
        <div className="w-full flex flex-row gap-2 items-center">
          <Image
            className="rounded-full flex w-[55px] h-[55px]"
            src={session?.user?.image ? session?.user?.image : NoUser}
            alt="profile"
            height={"55"}
            width={"55"}
          />
          <div className="flex flex-col leading-tight">
            <p className="font-semibold">
              {session ? session?.user?.name : "No name"}
            </p>
            <p className="text-sm text-gray-500 font-medium">
              {session ? session?.user?.email : "No email"}
            </p>
          </div>
          <button
            onClick={_logout}
            className="flex justify-end w-full items-center cursor-pointer"
            title="logout"
          >
            {Logout}
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-row gap-2 items-center animate-pulse">
          <div className="rounded-full w-12 h-12 bg-gray-300"></div>
          <div className="flex flex-col flex-1 leading-tight">
            <div className="w-20 h-4 bg-gray-300 mb-2"></div>
            <div className="w-16 h-3 bg-gray-300"></div>
          </div>
          <div className="w-12 h-12 bg-gray-300"></div>
        </div>
      )}
    </>
  );
};

export default AsideHeader;

import React from "react";
import Logo from "../logo";
import { sidebarData } from "@/constants/constants";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
  
  const _changeRoute = (path) => {
    router.push(path);
  };

  return (
    <div className="border-r shadow-md p-3 flex flex-col gap-6">
      <Logo />
      <div className="flex flex-col gap-1">
        {sidebarData.map((item) => {
          return (
            <div
              onClick={() => _changeRoute(item.path)}
              // as={`${item.path}/?referrer_source=newsletter`}
              // href={item.path}
              key={item.id}
              className={`flex flex-row gap-2 items-center  p-2 cursor-pointer rounded-md  font-medium ${
                item.path == pathName
                  ? "bg-cyan-500 text-white"
                  : "hover:text-white hover:bg-cyan-500"
              }`}
            >
              <span>{item.icon}</span>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

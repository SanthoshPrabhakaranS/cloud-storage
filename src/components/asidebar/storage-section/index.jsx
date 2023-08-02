import { asidebarData } from "@/constants/constants";
import { Images } from "@/icons/icons";
import React from "react";

const StorageSection = ({totalFileSize}) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-bold text-[1.4rem]">{totalFileSize ? totalFileSize : "0 MB"} used of 50 MB</h1>
        <div className="w-full h-3 bg-gray-300 flex flex-row">
          <div className="h-full w-[10%] bg-blue-600"></div>
          <div className="h-full w-[20%] bg-green-600"></div>
          <div className="h-full w-[10%] bg-yellow-400"></div>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {asidebarData.map((item) => {
          return (
            <div className="flex flex-row justify-between items-center border-b-2 pb-2" key={item.id}>
              <div className="flex flex-row gap-3 items-center">
                <p className={`bg-gray-200 p-2 rounded-md`}>
                  {item.icon}
                </p>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-[.8rem] text-gray-500">{item.numberOfFiles} Files</p>
                </div>
              </div>
              <h1 className="font-semibold">{item.size}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StorageSection;

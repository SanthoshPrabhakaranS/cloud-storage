import { Plus } from "@/icons/icons";
import Image from "next/image";
import React from "react";
import FolderImg from "../../assets/folder.png";
import "../../app/globals.css";
import { useRouter } from "next/navigation";

const RecentFolders = ({ setOpenAddFolderModal, folders, loading }) => {
  const router = useRouter();

  const _navigateToFiles = (id, folderName) => {
    router.push(`${folderName}/${id}`);
  };

  return (
    <div className="p-4 bg-white shadow-sm flex flex-col gap-5 rounded-md h-[450px]">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-lg">Recent Folders</h1>
        <button
          onClick={() => setOpenAddFolderModal(true)}
          className="flex flex-row gap-2 items-center px-3 py-3 bg-cyan-500 text-white font-semibold rounded-md text-sm"
        >
          Create Folder <span>{Plus}</span>
        </button>
      </div>

      <div className="folders-div relative">
        <div className="grid grid-cols-5 gap-2 h-full max-h-[350px] overflow-y-scroll">
          {folders.length !== 0 ? (
            folders.map((item) => {
              return (
                <div
                  onClick={() => _navigateToFiles(item.id, item.folderName)}
                  key={item.id}
                  className="p-2 border rounded-md flex flex-col justify-center items-center cursor-pointer hover:bg-gray-50"
                >
                  <Image
                    alt="folder"
                    src={FolderImg}
                    width={"60"}
                    height={"60"}
                  />
                  <p className="font-medium text-sm">{item.folderName}</p>
                </div>
              );
            })
          ) : (
            <h1 className="font-medium text-center w-full absolute">
              No Folders
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentFolders;

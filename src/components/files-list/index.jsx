import { Delete, Plus, Starred, UnStar } from "@/icons/icons";
import Image from "next/image";
import React from "react";
import FolderImg from "../../assets/folder.png";
import "../../app/globals.css";
import { useRouter } from "next/navigation";
import Doc from "../../assets/doc.png";
import Pdf from "../../assets/pdf.webp";
import Img from "../../assets/image.png";

const FilesList = ({
  setOpenAddFileModal,
  files,
  loading,
  folderNameHeading,
  _deleteFile,
  folderId,
  _deleteFolder,
  _addToStarred,
  setStarred,
  starred,
  folders,
}) => {
  const router = useRouter();

  const _timeStamp = (value) => {
    if (value?.seconds != null && value?.nanoseconds != null) {
      const { seconds, nanoseconds } = value;

      const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1e6); // Convert nanoseconds to milliseconds
      const dateObject = new Date(milliseconds);

      // Step 3: Format the date as "28 Jun 2023"
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(dateObject);

      return formattedDate;
    }
    return;
  };

  const _getFileImage = (type) => {
    if (type?.includes("image")) {
      return Img;
    } else if (type?.includes("pdf")) {
      return Pdf;
    }
    return Doc;
  };

  const _renderFileSize = (value) => {
    const memoryInMB = value / (1024 * 1024);

    if (memoryInMB >= 1) {
      return memoryInMB.toFixed(1) + " MB";
    } else {
      const memoryInKB = value / 1024;
      return memoryInKB.toFixed(1) + " KB";
    }
  };

  const _openFile = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const _isStarred = (heading) => {
    const starredFolder = folders.find((item) => item.folderName === heading);
    return starredFolder ? starredFolder.starred : false;
  };

  return (
    <div className="p-4 bg-white shadow-sm flex flex-col gap-5 rounded-md h-[450px]">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-l">{folderNameHeading}</h1>
        <div className="flex flex-row gap-4 items-center">
          <span
            onClick={_addToStarred}
            className={`text-[#F5C926] cursor-pointer`}
            title="Add to starred"
          >
            {_isStarred(folderNameHeading) ? Starred : UnStar}
          </span>
          <button
            onClick={() => setOpenAddFileModal(true)}
            className="flex flex-row gap-2 items-center px-3 py-3 bg-cyan-500 text-white font-semibold rounded-md text-sm"
          >
            Add File <span>{Plus}</span>
          </button>
          <button
            onClick={() => _deleteFolder(folderId, folderNameHeading)}
            className="flex flex-row gap-2 items-center px-3 py-3 bg-red-500 text-white font-semibold rounded-md text-sm"
          >
            Delete Folder
          </button>
        </div>
      </div>

      <div className="folders-div relative">
        <div className="overflow-y-scroll">
          {/* { loading ? <h1>Uploading...</h1> : null } */}
          <div>
            {files.length != 0 ? (
              files.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="p-2 text-sm flex items-center flex-row justify-between border-b cursor-pointer hover:bg-gray-50"
                  >
                    <p
                      onClick={() => _openFile(item.fileUrl)}
                      className="flex flex-row items-center gap-2"
                    >
                      {" "}
                      <Image
                        src={_getFileImage(item.fileType)}
                        alt="exe"
                        height={"30"}
                        width={"30"}
                      />{" "}
                      {item.fileName}
                    </p>
                    <div className="flex flex-row gap-9">
                      <p className="">{_timeStamp(item?.fileCreated)}</p>
                      <p className="">{_renderFileSize(item.fileSize)}</p>
                      <p className="flex justify-center items-center">
                        <span
                          onClick={() => _deleteFile(item.id)}
                          className="cursor-pointer text-red-600"
                        >
                          {Delete}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="font-medium text-center w-full">No files</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilesList;

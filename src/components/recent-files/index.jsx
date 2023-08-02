import { Delete, Plus } from "@/icons/icons";
import Image from "next/image";
import React, { useState } from "react";
import FolderImg from "../../assets/folder.png";
import "../../app/globals.css";
import Doc from "../../assets/doc.png";
import Pdf from "../../assets/pdf.webp";
import Img from "../../assets/image.png";

const RecentFiles = ({ recentFiles }) => {
  const _getFileImage = (type) => {
    if (type.includes("image")) {
      return Img;
    } else if (type.includes("pdf")) {
      return Pdf;
    }
    return Doc;
  };

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

  const _renderFileSize = (value) => {
    const memoryInMB = value / (1024 * 1024);

    if (memoryInMB >= 1) {
      return memoryInMB.toFixed(1) + " MB";
    } else {
      const memoryInKB = value / 1024;
      return memoryInKB.toFixed(1) + " KB";
    }
  };

  return (
    <div className="p-4 w-full bg-white shadow-sm flex flex-col gap-5 rounded-md">
      <h1 className="font-bold text-lg">Recent Files</h1>

      <div className="folders-div h-full max-h-[250px]">
        <div className="overflow-y-scroll">
          <table className="table-fixed w-full">
            <thead className="text-left">
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="p-1">Name</th>
                <th className="p-1 text-right">Modifed</th>
                <th className="p-1 text-right">Size</th>
              </tr>
            </thead>
            <tbody className="">
              {recentFiles.length != 0 ? (
                recentFiles.map((item) => {
                  return (
                    <tr key={item.id} className="p-2">
                      <td className="p-1 py-2 flex flex-row gap-2 truncate">
                        {" "}
                        <Image
                          src={_getFileImage(item.fileType)}
                          alt="exe"
                          height={"30"}
                          width={"30"}
                        />{" "}
                        {item.fileName}
                      </td>
                      <td className="p-1 py-2 text-right">
                        {_timeStamp(item?.fileCreated)}
                      </td>
                      <td className="p-1 py-2 text-right ">
                        {_renderFileSize(item.fileSize)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr className="font-medium text-center w-full p-1"><td>No Files</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentFiles;

import { Upload } from "@/icons/icons";
import React from "react";

export default function AddFileModal({
  setOpenAddFileModal,
  _uploadImage,
  loading,
}) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-1 border-solid border-slate-200 rounded-t">
              <button
                className="ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setOpenAddFileModal(false)}
              >
                <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-5 flex-auto">
              <label htmlFor="files">
                <div className="p-3 bg-cyan-50 border-2 cursor-pointer border-dotted border-gray-500 rounded-2xl">
                  <div className="w-[300px] h-[250px] flex flex-col justify-center items-center font-medium ">
                    <span>{Upload}</span>
                    <p>Click to upload the file</p>
                  </div>
                </div>
              </label>
              <input
                onChange={(e) => _uploadImage(e.target.files[0])}
                type="file"
                id="files"
                className="hidden"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

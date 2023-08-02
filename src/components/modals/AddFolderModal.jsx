import React from "react";

export default function AddFolderModal({
  setOpenAddFolderModal,
  setFolderName,
  _createFolder
}) {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-1 border-solid border-slate-200 rounded-t">
              <button
                className="p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setOpenAddFolderModal(false)}
              >
                <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-3 flex-auto">
              <input
                type="text"
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Folder name"
                className="w-full border border-gray-300 p-2 focus:outline-none"
              />
            </div>
            {/*footer*/}
            <div className="p-3 border-solid border-slate-200 rounded-b">
              <button
                className="w-full bg-emerald-500 text-white active:bg-emerald-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={_createFolder}
              >
                Create folder
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

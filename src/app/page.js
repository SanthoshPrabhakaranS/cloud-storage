"use client";

import AddFolderModal from "@/components/modals/AddFolderModal";
import RecentFiles from "@/components/recent-files";
import RecentFolders from "@/components/recent-folders";
import SearchBar from "@/components/searchbar";
import { db } from "@/firebase/config";
import { useStore } from "@/store/store";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [openAddFolderModal, setOpenAddFolderModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [folders, setFolders] = useState([]);
  const [recentFiles, setRecentFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalFolderList, setOriginalFolderList] = useState([]);
  const folderCollection = collection(db, "folders");
  const fileCollection = collection(db, "files");
  const docId = Date.now().toString();
  const setTotalFileSize = useStore((state) => state.setTotalFileSize);

  useEffect(() => {
    if (!session) {
      return router.push("/signup");
    }
    _getAllFolders();
    _getRecentfiles();
  }, [session]);

  const _createFolder = async () => {
    try {
      await addDoc(folderCollection, {
        folderName,
        id: docId,
        createdBy: session?.user?.email,
        starred: false,
      });
      setOpenAddFolderModal(false);
      _getAllFolders();
    } catch (error) {
      console.error(error);
    }
  };

  const _getAllFolders = async () => {
    const queryMessages = query(
      folderCollection,
      where("createdBy", "==", session?.user?.email)
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let folders = [];
      snapshot.forEach((doc) => {
        folders.push({ ...doc.data(), id: doc.id });
      });
      setFolders(folders);
      setOriginalFolderList(folders);
    });

    return () => unsubscribe();
  };

  const _getRecentfiles = async () => {
    const queryMessages = query(
      fileCollection,
      where("createdBy", "==", session?.user?.email)
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let files = [];
      snapshot.forEach((doc) => {
        files.push({ ...doc.data(), id: doc.id });
      });
      setRecentFiles(files.slice(0, 4));
      _renderFileSize(files);
    });

    return () => unsubscribe();
  };

  const _renderFileSize = (data) => {
    const totalFileSizeInKB = data.reduce((accumulator, item) => {
      const fileSizeInKB = item.fileSize / 1024; // Convert fileSize to KB
      return accumulator + fileSizeInKB;
    }, 0);

    let formattedTotal = totalFileSizeInKB.toFixed(1) + " KB";

    if (totalFileSizeInKB >= 1024) {
      // If the total exceeds 1024 KB (1 MB), convert to MB
      const totalFileSizeInMB = totalFileSizeInKB / 1024;
      formattedTotal = totalFileSizeInMB.toFixed(1) + " MB";
    }

    console.log(formattedTotal); // This will give you the total size with the appropriate unit (KB or MB)
    setTotalFileSize(formattedTotal); // You can return the formattedTotal if needed
  };

  //Search Folders
  const _searchFolder = (value) => {
    if (value !== "") {
      const filteredFolders = folders.filter((item) =>
        item.folderName.toString().toLowerCase().includes(value.toLowerCase())
      );
      setFolders(filteredFolders);
    } else {
      setFolders(originalFolderList);
    }
  };

  return (
    <div className="h-full flex flex-col gap-5">
      {openAddFolderModal ? (
        <AddFolderModal
          setFolderName={setFolderName}
          setOpenAddFolderModal={setOpenAddFolderModal}
          _createFolder={_createFolder}
        />
      ) : null}
      <SearchBar _searchFolder={_searchFolder} />
      <RecentFolders
        loading={loading}
        folders={folders}
        setOpenAddFolderModal={setOpenAddFolderModal}
      />
      <RecentFiles recentFiles={recentFiles} />
    </div>
  );
}

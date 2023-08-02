"use client";

import RecentFiles from "@/components/recent-files";
import SearchBar from "@/components/searchbar";
import StarredFolders from "@/components/starred-folders";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Starred = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [starredFolders, setStarredFolders] = useState([]);
  const [originalFolderList, setOriginalFolderList] = useState([]);
  const [recentFiles, setRecentFiles] = useState([]);
  const folderCollection = collection(db, "folders");
  const fileCollection = collection(db, "files");

  useEffect(() => {
    if (!session) {
      return router.push("/signup");
    }
    _getAllFolders();
    _getRecentfiles();
  }, [session]);

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
      setStarredFolders(folders);
      setOriginalFolderList(folders);
    });

    return () => unsubscribe();
  };

  //Search Folders
  const _searchFolder = (value) => {
    if (value !== "") {
      const filteredFolders = starredFolders.filter((item) =>
        item.folderName.toString().toLowerCase().includes(value.toLowerCase())
      );
      setStarredFolders(filteredFolders);
    } else {
      setStarredFolders(originalFolderList);
    }
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
    });

    return () => unsubscribe();
  };

  return (
    <div className="h-full flex flex-col gap-5">
      <SearchBar _searchFolder={_searchFolder} />
      <StarredFolders starredFolders={starredFolders} />
      <RecentFiles recentFiles={recentFiles} />
    </div>
  );
};

export default Starred;

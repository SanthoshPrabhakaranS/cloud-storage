"use client";

import FilesList from "@/components/files-list";
import AddFileModal from "@/components/modals/AddFileModal";
import RecentFiles from "@/components/recent-files";
import SearchBar from "@/components/searchbar";
import { db, storage } from "@/firebase/config";
import { useStore } from "@/store/store";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [openAddFileModal, setOpenAddFileModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [folders, setFolders] = useState([]);
  const [originalFileList, setOriginalFileList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const filesCollection = collection(db, "files");
  const folderCollection = collection(db, "folders");
  const docId = Date.now().toString();
  const path = usePathname();
  const parts = path.split("/");
  const folderId = parts[parts.length - 1];
  const firstPartFromPath = parts[parts.length - 2];
  const folderNameHeading = decodeURIComponent(
    firstPartFromPath.replace(/%20/g, " ")
  );
  const setStarred = useStore((state) => state.setStarred);
  const starred = useStore((state) => state.starred);
  const setTotalFileSize = useStore((state) => state.setTotalFileSize);

  useEffect(() => {
    if (!session) {
      return router.push("/signup");
    }
    _getAllfiles();
    _getAllFolders();
    _getRecentfiles()
  }, [session]);

  //uploading image and getting url
  const _uploadImage = async (file) => {
    if (!file) return;

    const imageRef = ref(storage, `/files/${file.name}`);
    await uploadBytes(imageRef, file)
      .then(() => {
        return getDownloadURL(imageRef);
      })
      .then((imageUrl) => {
        setOpenAddFileModal(false);
        // console.log(imageUrl, "url");
        _addFiles(imageUrl, file);
      })
      .then(() => {});
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
    });

    return () => unsubscribe();
  };

  const _addFiles = async (imageUrl, file) => {
    try {
      await addDoc(filesCollection, {
        folderName: folderNameHeading,
        id: docId,
        createdBy: session?.user?.email,
        fileUrl: imageUrl,
        fileCreated: serverTimestamp(),
        fileType: file.type,
        fileSize: file.size,
        fileName: file.name,
      });
      _getAllfiles();
    } catch (error) {
      console.error(error);
    }
  };

  const _getAllfiles = async () => {
    const queryMessages = query(
      filesCollection,
      where("folderName", "==", folderNameHeading)
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let files = [];
      snapshot.forEach((doc) => {
        files.push({ ...doc.data(), id: doc.id });
      });
      setFiles(files);
      setOriginalFileList(files);
    });

    return () => unsubscribe();
  };

  const _getRecentfiles = async () => {
    const queryMessages = query(
      filesCollection,
      where("createdBy", "==", session?.user?.email)
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let files = [];
      snapshot.forEach((doc) => {
        files.push({ ...doc.data(), id: doc.id });
      });
      _renderFileSize(files);
    });

    return () => unsubscribe();
  };

  //getting Total file size
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

  const _deleteFile = async (id) => {
    await deleteDoc(doc(db, "files", id));
  };

  const _deleteFolder = async (id, folderName) => {
    await deleteDoc(doc(db, "folders", id));
    const filesQuery = query(
      collection(db, "files"),
      where("folderName", "==", folderName)
    );
    const fileDocsSnapshot = await getDocs(filesQuery);
    const deleteFilePromises = fileDocsSnapshot.docs.map((fileDoc) =>
      deleteDoc(fileDoc.ref)
    );
    await Promise.all(deleteFilePromises);
    router.push("/");
  };

  //Add files to Starred
  const _addToStarred = async () => {
    const currentStarred = useStore.getState().starred;
    const newStarredValue = !currentStarred;
    await useStore.getState().setStarred(newStarredValue);

    const docRef = doc(db, "folders", folderId);

    const updateObject = {
      starred: newStarredValue,
    };
    try {
      await updateDoc(docRef, updateObject);
    } catch (error) {
      console.error(error);
    }
  };

  //Search Files
  const _searchFolder = (value) => {
    setSearchText(value);
    if (value !== "") {
      const filteredFiles = files.filter((item) =>
        item.fileName.toString().includes(searchText.toLocaleLowerCase())
      );
      setFiles(filteredFiles);
    } else {
      setFiles(originalFileList);
    }
  };

  return (
    <div className="h-full flex flex-col gap-5">
      {openAddFileModal ? (
        <AddFileModal
          setOpenAddFileModal={setOpenAddFileModal}
          _uploadImage={_uploadImage}
          loading={loading}
        />
      ) : null}
      <SearchBar _searchFolder={_searchFolder} />
      <FilesList
        folderNameHeading={folderNameHeading}
        loading={loading}
        files={files}
        setOpenAddFileModal={setOpenAddFileModal}
        _deleteFile={_deleteFile}
        folderId={folderId}
        _deleteFolder={_deleteFolder}
        _addToStarred={_addToStarred}
        setStarred={setStarred}
        starred={starred}
        folders={folders}
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import AsideHeader from "./header";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import StorageSection from "./storage-section";
import AsideFooter from "./footer";
import { useStore } from "@/store/store";

const Asidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const totalFileSize = useStore((state) => state.totalFileSize);

  const _logout = async () => {
    await signOut();
    router.push("/signup");
  };

  return (
    <div className="flex flex-col gap-6">
      <AsideHeader session={session} _logout={_logout} />
      <StorageSection totalFileSize={totalFileSize} />
      <AsideFooter />
    </div>
  );
};

export default Asidebar;

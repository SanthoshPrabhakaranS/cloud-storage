"use client";

import { Google } from "@/icons/icons";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Signup = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      return router.push("/");
    }
    return;
  }, [session]);

  const _signIn = async () => {
    await signIn();
    router.push("/");
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <button
        onClick={_signIn}
        className="flex flex-row gap-2 items-center bg-blue-400 text-white font-semibold border border-blue-400"
      >
        {" "}
        <span className="bg-white p-2">{Google}</span>{" "}
        <h1 className="p-2">Sign in with Google</h1>{" "}
      </button>
    </div>
  );
};

export default Signup;

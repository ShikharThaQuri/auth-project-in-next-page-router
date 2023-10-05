import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/layout";

function Profile() {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      console.log({ user });

      if (error) {
        push("/login");
        return;
      }

      setIsSuccess(true);
    })();
  }, [push]);

  if (!isSuccess) {
    return (
      <>
        <Layout>
          <p className="text-[#80ed99] font-bold text-[2rem]">Loading...</p>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout>
        <div className="text-[#80ed99] font-bold text-[2rem]">
          Protected Route
        </div>
        <Link
          href="/"
          className="fixed bottom-[0.5rem] right-[0.5rem] bg-[#a7c957] px-[0.9rem] py-[0.5rem] rounded"
        >
          Home Page
        </Link>
      </Layout>
    </>
  );
}

async function getUser() {
  try {
    const { data } = await axios.get("/api/user");

    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;

    return {
      user: null,
      error,
    };
  }
}

export default Profile;

import Link from "next/link";
import React from "react";

import Login from "../../components/login/login";

function Index() {
  return (
    <>
      <Login />
      <Link
        href="/"
        className="fixed bottom-[0.5rem] right-[0.5rem] bg-[#a7c957] px-[0.9rem] py-[0.5rem] rounded"
      >
        Home Page
      </Link>
    </>
  );
}

export default Index;

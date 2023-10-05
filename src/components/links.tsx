import Link from "next/link";
import React from "react";

function links() {
  return (
    <>
      <div className="fixed top-[1rem] left-[1rem]">
        <Link
          href="/dashboard"
          className="bg-[#9f86c0] py-[0.3rem] px-[0.7rem] rounded"
        >
          Dashboard
        </Link>
      </div>
      <div className="fixed top-[1rem] right-[1rem]">
        <Link
          href="/login"
          className="bg-[#9f86c0] py-[0.3rem] px-[0.7rem] rounded"
        >
          LOGIN
        </Link>

        <Link
          href="/regester"
          className="bg-[#9f86c0] py-[0.3rem] px-[0.7rem] ml-[1rem] rounded"
        >
          REGESTER
        </Link>
      </div>
    </>
  );
}

export default links;

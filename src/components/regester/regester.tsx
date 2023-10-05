import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function regester() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function preventDefault(e: any) {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/regester", {
        username: name,
        password: password,
      });

      if (data.success === true) {
        localStorage.setItem("Authorization", data.token);
        axios.defaults.headers.common["Authorization"] = data.token;

        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }

    setMsg("You have to fill both UserName and Password");
  }

  return (
    <div className="bg-[#cdb4db] h-[100vh] flex justify-center items-center">
      <div className="bg-[#f5ebe0] w-[30%] p-[1rem] text-center  rounded-md">
        <h1 className="font-bold">REGESTER</h1>
        <form className="text-left" action="" onSubmit={preventDefault}>
          <div className="mt-[0.6rem]">
            <label className="block mb-[0.2rem]">User Name</label>
            <input
              className="w-[100%] outline-none px-[0.3rem] py-[0.5rem]"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-[0.6rem]">
            <label className="block mb-[0.2rem]">Password</label>
            <input
              className="w-[100%] outline-none px-[0.3rem] py-[0.5rem]"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="bg-[#8338ec] text-white w-[100%] mt-[1rem] py-[0.5rem] font-bold">
            Submit
          </button>

          <div className="mt-[0.8rem] text-right">
            <Link href="/login">Already have an accout?</Link>
          </div>

          <div className="mt-[0.8rem] text-center text-[#c1121f]">
            <p>{msg}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default regester;

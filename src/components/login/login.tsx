import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

function login() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [wrong, setWrong] = useState("");

  async function preventDefault(e: any) {
    e.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        username: name,
        password: password,
      });

      if (response.data.success === true) {
        let token = response.data.token;
        localStorage.setItem("Authorization", token);
        axios.defaults.headers.common["Authorization"] = token;

        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }

    setWrong("Your username or password is wrong");
  }

  return (
    <div className="bg-[#cdb4db] h-[100vh] flex justify-center items-center">
      <div className="bg-[#f5ebe0] w-[30%] p-[1rem] text-center  rounded-md">
        <h1 className="font-bold">LOG IN</h1>
        <form className="text-left" action="" onSubmit={preventDefault}>
          <div className="mt-[0.6rem]">
            <label className="block mb-[0.2rem]">User Name</label>
            <input
              className="w-[100%] outline-none px-[0.3rem] py-[0.5rem]"
              type="text"
              id="name"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </div>

          <div className="mt-[0.6rem]">
            <label className="block mb-[0.2rem]">Password</label>
            <input
              className="w-[100%] outline-none px-[0.3rem] py-[0.5rem]"
              type="password"
              id="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </div>

          <button className="bg-[#8338ec] text-white w-[100%] mt-[1rem] py-[0.5rem] font-bold">
            Submit
          </button>

          <div className="mt-[0.8rem] text-right">
            <Link href="/regester">Don't have an accout?</Link>
          </div>

          <div className="mt-[0.8rem] text-center text-[#c1121f]">
            <p>{wrong}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default login;

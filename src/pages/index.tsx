import { Inter } from "next/font/google";

import Links from "../components/links";
import HomeLayout from "../components/homeLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <HomeLayout />
      <Links />
    </>
  );
}

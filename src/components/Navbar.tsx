import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { TbLocation } from "react-icons/tb";
import { TiWeatherPartlySunny } from "react-icons/ti";
import SearchBar from "./SearchBar";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex items-center justify-between  max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Next Weather</h2>
          <TiWeatherPartlySunny className="text-4xl mt-1 text-gray-300 ml-1" />
        </p>
        <section className="flex gap-2 items-center justify-end">
          <IoLocationOutline className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
          <TbLocation className="text-2xl text-gray-400" />
          <p className="text-slate-900/80 text-sm">Romania</p>
          <SearchBar />
        </section>
      </div>
    </nav>
  );
}

import { cn } from "@/utils/cn";
import React from "react";
import { CiSearch } from "react-icons/ci";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBar({
  onSubmit,
  onChange,
  value,
  className,
}: Props) {
  return (
    <form
      className={cn(
        "flex relative items-center justify-center h-10",
        className
      )}
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="Search..."
        className="px-4 py-2 w-[230px] border border-gray-300 rounded-5-md focus:outline-none h-full"
        onChange={onChange}
        value={value}
      />
      <button className="px-4 py-[9px] text-white focus:outline-none h-full">
        <CiSearch className="text-2xl text-gray-500" />
      </button>
    </form>
  );
}

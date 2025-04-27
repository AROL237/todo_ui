"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function ButtonComponent({
  className,
  children,
  myname,
  data,
  action,
  type,
}) {
  const router = useRouter();

  function handleClick(e, name) {
    // const { name, title } = e.target;

    if (name == "create") {
      router.push("/create");
      return;
    } else if (name == "edit") {
      router.push("/edit/" + data.id);
      return;
    } else if (name == "delete") {
      action(data.id);
      return;
    }
    //
  }
  return (
    <button
      onClick={(e) => handleClick(e.target, myname)}
      title={myname}
      className={
        type != "icon"
          ? `appearance-none hover:cursor-pointer text-center  min-h-[48px] min-w-[120px] content-center select-none active:translate-0.5 transition shadow  rounded-xl hover:-translate-y-0.5 active:saturate-200 hover:saturate-200 ` +
            className
          : className
      }
    >
      {children}
    </button>
  );
}

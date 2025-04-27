"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

export default function ModalComponent({ message, title, type, open }) {
  const router = useRouter;
  const [isOpen, setIsOpen] = useState(open);
  const [style, setStyle] = useState("");

  useEffect(() => {
    if (type == "success") {
      setStyle("text-green-500 tracking-wide");
    } else if (type == "error") {
      setStyle("text-red-500 tracking-wide");
    } else if (type == "warning") {
      setStyle("text-yellow-500 tracking-wide");
    }
  }, [type]);

  const handleClose = () => {};

  return (
    <>
      {isOpen && (
        <div
          className={`modal ${style}   p-1 border absolute bg-orange-200 border-neutral-50 right-0 h- fit bottom-0  min-w-[350px]  rounded-lg  flex items-center justify-center`}
        >
          <div className="modal-content">
            <h2>{title}</h2>
            <p>{message}</p>
            {/* <button onClick={handleClose}>Close</button> */}
          </div>
        </div>
      )}
    </>
  );
}

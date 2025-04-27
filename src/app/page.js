"use client";
import React from "react";
import ButtonComponent from "@/components/home/ButtonComponent";
import TodoTableComponent from "@/components/home/todoTableComponent";
import ModalComponent from "@/components/notification/modal";

export default function Home() {
  const [notification, setnotification] = React.useState({
    title: "Message",
    message: "",
    type: "",
    open: false,
  });

  React.useEffect(() => {
    // setIsOpen(false);
    setTimeout(() => {
      // Close the notification after a delay
      setnotification((data) => ({ ...data, open: false }));
    }, 3000); // Adjust the delay as needed
  }, [notification.open]);

  return (
    <>
      <div className="  grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <h1 className="text-4xl font-bold text-center">Todo App</h1>
          <h2 className="text-2xl font-bold text-center">
            Welcome to the Todo App
          </h2>
          <p className="text-lg text-center">
            This is a simple Todo application built with Next.js for frontend ,
            express.js and MySQL.
          </p>
          <p className="text-lg text-center">You can</p>
          <div id="todo-list-action-button" className="flex flex-row gap-5 ">
            <ButtonComponent
              type={"text"}
              myname="create"
              className="py-3 px-4 bg-blue-500 saturate-50 capitalize text-nowrap "
            >
              create new
            </ButtonComponent>
          </div>
          {<TodoTableComponent setnotification={setnotification} />}
        </main>
      </div>
      {notification.open && (
        <ModalComponent
          open={notification.open}
          type={notification.type}
          message={notification.message}
          title={notification.title}
        />
      )}
    </>
  );
}

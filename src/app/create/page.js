"use client";
import ButtonComponent from "@/components/home/ButtonComponent";
import React, { useEffect, useState } from "react";
import { API } from "../api";
import ModalComponent from "@/components/notification/modal";
import { useRouter } from "next/navigation";



const addTodo = () => {
  const [todo, setTodo] = useState({
    titel: "",
    description: "",
    completed: false,
  });
  const [notification, setnotification] = useState({
    title: "",
    message: "",
    type: "",
    open: false,
  });

  const router = useRouter();
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    event.preventDefault();
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    API.post("/todo", JSON.stringify(todo))
      .then((res) => {
        setnotification({
          title: "Message",
          message: "SUCCES !",
          type: "success",
          open: true,
        });
      })
      .catch((error) => {
        setnotification({
          title: "Message",
          message: "ERROR : " + error,
          type: "error",
          open: true,
        });
      });
  };

  useEffect(() => {
    // setIsOpen(false);

    setTimeout(() => {
      if (notification.type === "success") {
        router.push("/");
      }
      setnotification((data) => ({ ...data, open: false }));
    }, 1000); // Adjust the delay as needed
  }, [notification.open]);

  const handleReset = (event) => {
    event.preventDefault;
    setTodo({
      titel: "",
      description: "",
      status: false,
    });
  };

  return (
    <div className=" p-10 w-full items-center  justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent the default form submission behavior
          handleSubmit(); // Call the handleSubmit function
        }}
        className="  border  flex flex-col gap-2 rounded-xl border-amber-200  p-10 max-w-[500px] m-auto"
      >
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor="title">Title:</label>
          <input
            className=" ring-1 ring-amber-200  w-full border-neutral-300 rounded-md p-2"
            type="text"
            id="title"
            name="titel"
            value={todo.titel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor="description">Description:</label>
          <textarea
            className=" ring-1 ring-amber-200  w-full border-neutral-300 rounded-md p-2"
            id="description"
            name="description"
            value={todo.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <label htmlFor="status">Status:</label>
          <input
            className="w-5 h-5 text-blue-500 border-2 border-gray-300 rounded focus:ring focus:ring-blue-300 focus:outline-none"
            type="checkbox"
            id="completed"
            name="completed"
            checked={todo.status}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <ButtonComponent
            action={handleSubmit}
            className={" bg-blue-500"}
            type="submit"
          >
            Submit
          </ButtonComponent>
          <ButtonComponent
            className={"bg-red-300"}
            type="reset"
            onClick={(e) => handleReset(e)}
          >
            Reset
          </ButtonComponent>
        </div>
      </form>
      {notification.open && (
        <ModalComponent
          open={notification.open}
          type={notification.type}
          message={notification.message}
          title={notification.title}
        />
      )}
    </div>
  );
};

export default addTodo;

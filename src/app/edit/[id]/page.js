"use client";
import { API } from "@/app/api";
import ButtonComponent from "@/components/home/ButtonComponent";
import ModalComponent from "@/components/notification/modal";
import { useRouter } from "next/navigation";
import React from "react";

export default function editPage({ params }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState();
  const [todo, setTodo] = React.useState({
    titel: "",
    description: "",
    completed: false,
  });
  const [notification, setnotification] = React.useState({
    title: "",
    message: "",
    type: "",
    open: false,
  });
  const [id, setId] = React.useState(null);
  React.useEffect(() => {
    params
      .then((resolvedParams) => {
        setId(Number(resolvedParams.id)); // Assuming id is a number
      })
      .catch((error) => {
        setError("Failed to resolve parameters");
        console.error("Error resolving parameters:", error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after resolving the parameters
      });
  }, [params]);
  //here is a function to fetch data from the API
  // and set the state with the response data
  const fetchData = async () => {
    if (!id) return; // Wait until `id` is resolved
    try {
      const response = await API.get(`/todo/${id}`);
      if (response.status === 200) {
        setTodo(response.data[0]);
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await API.put(`/todo/${id}`, todo);
      if (response.status === 200) {
        setnotification({
          title: "Message",
          message: "SUCCES !",
          type: "success",
          open: true,
        });
        router.push("/");
      } else {
        setError("Failed to update data");
      }
    } catch (error) {
      setError("Failed to update data");
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (notification.type === "success") {
        router.push("/");
      }
      setnotification((data) => ({ ...data, open: false }));
    }, 2000); // Adjust the delay as needed
  }, [notification.open]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (loading) {
    return <div className="h-dvw w-full backdrop-blur-2xl">Loading...</div>;
  }
  // Handle error state
  if (error) {
    return <div className="h-dvw w-full backdrop-blur-2xl">{error}</div>;
  }
  if (!todo) {
    return <div className="h-dvw w-full backdrop-blur-2xl">Todo not found</div>;
  }
  return (
    <div className=" p-10 w-full items-center  justify-center">
      <form
        onSubmit={(e) => handleUpdate(e)}
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
            checked={todo.completed}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row gap-2 justify-end">
          <ButtonComponent
            action={(e) => handleUpdate(e)}
            className={" bg-blue-500"}
            type="submit"
          >
            Submit
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
}

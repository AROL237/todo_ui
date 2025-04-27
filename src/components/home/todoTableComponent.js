"use client";
import React from "react";
import ButtonComponent from "./ButtonComponent";
import { API } from "@/app/api";

export default function TodoTableComponent({ setnotification }) {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState({
    status: false,
    message: "",
  });

  // function to get todos retuns a list of todos
  const getTodos = () => {
    setLoading(true);
    API.get("/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError({
          status: true,
          message: error,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /// function to delete a todo item
  // it takes the id of the todo item to be deleted as a parameter
  const handleDelete = async (id) => {
    try {
      const response = await API.delete(`/todo/${id}`);
      if (response.status === 200) {
        setnotification({
          title: "Message",
          message: "Item deleted successfully!",
          type: "success",
          open: true,
        });
        setTimeout(() => {
          // Close the notification after a delay
          setnotification((data) => ({ ...data, open: false }));
        }, 3000); // Adjust the delay as needed

        getTodos(); // Reload the data after successful deletion
      } else {
        setnotification({
          title: "message",
          message: "Failed to delete the item." + id,
          type: "error",
          open: true,
        });
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setnotification({
        title: "Error",
        message: "An error occurred while deleting the item.",
        type: "error",
        open: true,
      });
    }
  };

  // function to update a todo item
  React.useEffect(() => {
    getTodos();
  }, []);

  // function to handle the error message

  if (error.status) {
    return <div className="">{error.message}</div>;
  }

  return (
    <div>
      <div className="flex flex-col border-2 max-h-full border-amber-300 gap-[32px] items-center w-full sm:w-[500px] md:w[800px] lg:w-[1000px] p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center">List</h2>
        {loading ? (
          <div className="">Loading...</div>
        ) : todos.length == 0 ? (
          <div> No item </div>
        ) : (
          todos.map((todo, index) => {
            return (
              <div className="flex flex-col w-full gap-5 p=" key={index}>
                <div className="flex flex-col  backdrop-blur-3xl px-8 bg-amber-100 py-5 rounded-xl text-black gap-[20px] items-center w-full">
                  <h2 className="text-2xl font-semibold capitalize">
                    {todo.titel}
                  </h2>
                  <label className="text-sm text-neutral-500">
                    {todo.description}
                  </label>
                  <label
                    className={
                      todo.completed
                        ? "text-green-500 text-xs font-extralight tracking-wide capitalize saturate-200 "
                        : "text-red-500 text-xs font-extralight tracking-wide capitalize saturate-200"
                    }
                  >
                    {todo.completed ? "completed" : "not completed"}
                  </label>
                  <div
                    id="todo-action button-delete"
                    className="flex flex-row justify-end gap-2 w-full "
                  >
                    <ButtonComponent
                      myname="edit"
                      title="edit"
                      type={"icon"}
                      data={todo}
                      children={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                      }
                      className="hover:cursor-pointer p-1 bg-transparent roundede-sm hover:-translate-y-0.5 tranition active:translate-y-0.5 text-blue-500 capitalize"
                    />

                    <ButtonComponent
                      myname="delete"
                      title="delete"
                      type={"icon"}
                      data={todo}
                      action={handleDelete}
                      children={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      }
                      className="hover:cursor-pointer p-1 bg-transparent roundede-sm hover:-translate-y-0.5 tranition active:translate-y-0.5 text-red-500 capitalize"
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

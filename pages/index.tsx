import React from "react";
import HomeLayout from "@/components/HomeLayout";
import TaskCard from "@/components/TaskCard";
import axios from "axios";
import toast from "react-hot-toast";
import { dateSort } from "@/utils/compareDate";
import { TodoInterface } from "@/utils/compareDate";



export default function Home() {
  const [deleteTask, setdeleteTask] = React.useState(false);
  const [markedTask, setmarkedTask] = React.useState(false);
  const [search, setsearch] = React.useState("");
  const [allTodos, setallTodos] = React.useState<TodoInterface[]>([
    {
      title: "",
      dueDate: "",
      description: "",
      status: false,
    },
  ]);

  const getTodos = async () => {
    try {
      await axios
        .get("http://localhost:8000/api/v1/getalltodos")
        .then((data) => {
          setallTodos(data.data.todos);
        });
    } catch (error: any) {
      return toast.error(error.response.data.err);
    }
  };
 
  //after delete and marked complete ,marked uncomplete update todolist
  React.useEffect(() => {
    getTodos();
  }, [deleteTask,markedTask]);

  //for filter according to search 
  const handleSearch = () => {
    const dummyarr=allTodos.filter((todoData) =>
    todoData.title.toLowerCase().includes(search)
    );
    // sort according to duedate
    return dateSort(dummyarr)
    
  };

  return (
    <HomeLayout>
      <div className="bg-[#FFDDD2] px-[2rem] py-[2rem] h-full overflow-y-scroll no-scrollbar ">
        <div className="flex justify-center ">
          <div className="border-b-[2px] border-solid border-[#006D77] ">
            <h1 className=" m-[auto] text-[1.3rem]  font-[700] text-[#006D77] leading-[40px]">
              Running Task
            </h1>
          </div>
        </div>
        <div className="mt-[2rem]  ">
          <div className=" w-[100%] sm:w-[70%] md:w-[70%] lg:w-[25%] rounded-md bg-[#FFDDD2] ">
            <input
              type="text"
              className="w-[100%] px-[0.7rem] py-[0.5rem] outline-none border-[#006D77] border-solid border-[1.5px] bg-[#FFDDD2] rounded-md placeholder:text-sm"
              placeholder="Search Todo Here "
              value={search}
              onChange={(e) => {
                setsearch(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-[2rem] flex flex-wrap gap-[2rem] ">
          {handleSearch()?.map((allTodosData: TodoInterface, index: Number) => {
             // for only show uncompleted tasks
            if (!allTodosData.status) {
              return (
                <div className=" basis-[100%]  md:basis-[40%] lg:basis-[30%] sm:basis-[46%] m-[auto] sm:m-[0] md:m-0 lg:m-0" key={`${allTodos}+${index}`}>
                  <TaskCard
                    todoData={allTodosData}
                    deleteTask={deleteTask}
                    setdeleteTask={setdeleteTask}
                    markedTask={markedTask}
                    setmarkedTask={setmarkedTask}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </HomeLayout>
  );
}

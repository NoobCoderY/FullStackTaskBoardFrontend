import HomeLayout from "@/components/HomeLayout";
import TaskCard from "@/components/TaskCard";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import { TodoInterface } from "@/utils/compareDate";


const CompletedTasks = () => {
  const [deleteTask, setdeleteTask] = React.useState(false)
  const [markedTask, setmarkedTask] = React.useState(false);
  const [allTodos, setallTodos] = React.useState<TodoInterface[]>([
    {
      title: "",
      dueDate: "",
      description: "",
      status: false,
    },
  ]);

  //function for find  get allTodo
  const getTodos = async () => {
    try {
      await axios
        .get("https://taskdashboard2.onrender.com/api/v1/getalltodos")
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
  return (
    <>
      <HomeLayout>
        <div className="bg-[#FFDDD2] px-[2rem] py-[2rem] h-full no-scrollbar overflow-y-scroll">
          <div className="flex justify-center ">
            <div className="border-b-[2px] border-solid border-[#006D77] ">
              <h1 className=" m-[auto] text-[1.3rem]  font-[700] text-[#006D77] leading-[40px]">
                Completed Task
              </h1>
            </div>
          </div>

          <div className="mt-[2rem] flex flex-wrap gap-[2rem] ">
            {allTodos?.map((allTodosData, index) => {
              // for only show completed tasks
              if (allTodosData.status) {
                return (
                  <div className="basis-[100%]  md:basis-[40%] lg:basis-[30%] sm:basis-[46%] m-[auto] sm:m-[0] md:m-0 lg:m-0" key={`${allTodos}+${index}`}>
                    <TaskCard todoData={allTodosData} deleteTask={deleteTask} setdeleteTask={setdeleteTask}  markedTask={markedTask}
                      setmarkedTask={setmarkedTask}
                      setallTodos={setallTodos}
                      allTodos={allTodos}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default CompletedTasks;

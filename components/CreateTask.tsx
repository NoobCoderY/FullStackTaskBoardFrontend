import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import DatePicker from "../components/DatePicker";
import CustomeTextArea from "../components/CustmTextArea";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { compareDate } from "@/utils/compareDate";
import axios from "axios";
import { useRouter } from "next/router";
import { TodoInterface } from "@/utils/compareDate";


const CustomTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#006D77",
    },
  },
});

const CreateTask = () => {
  const router = useRouter();
  const currentDate = new Date();
  const [todoCreate, settodoCreate] = useState<TodoInterface>({
    title: "",
    dueDate: "",
    description: "",
    status: false,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    settodoCreate({
      ...todoCreate,
      [name]: value,
    });
  };


  async function handleSubmit() {
    if (todoCreate.title.length < 7) {
      return toast.error("Please enter title more than 7 character");
    } else if (todoCreate.description.length < 20) {
      return toast.error("Please enter description more than 20 character");
    } else if (
      compareDate(todoCreate.dueDate) ||
      todoCreate.dueDate === "NaN/NaN/NaN"
    ) {
      if (compareDate(todoCreate.dueDate)) {
        return toast.error("please do not enter past date");
      } else {
        return toast.error("please enter date");
      }
    } else {
      try {
        await axios
          .post("http://localhost:8000/api/v1/create", todoCreate, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((data: any) => {
            toast.success(`${data?.data.message}`);
            router.push("/");
          });
      } catch (err: any) {
        return toast.error(err.response.data.err);
      }
    }
  }

  return (
    <div className="bg-[#FFDDD2] px-[2rem] py-[2rem] h-full">
      <div className="flex justify-center">
        <div className="bg-[#83C5BE] p-[1rem] w-[100%] sm:w-[80%] md:w-[70%] lg:w-[50%] sm:p-[1.3rem] md:p-[1.7rem] lg:p-[2rem] flex rounded-md">
          <h1 className=" m-[auto] text-[1.3rem]  sm:text-[1.7rem]  md:text-[2rem]  lg:text-[2.3rem]   font-[700] text-white leading-[36px] ">
            Create Your Task
          </h1>
        </div>
      </div>
      <div className="flex justify-center mt-[3rem]">
        <div className=" w-[100%] sm:w-[80%]  md:w-[70%]  lg:w-[70%]">
          <div className="flex justify-between flex-col sm:flex-xol md:flex-row lg:flex-row gap-5">
            <div className="basis-[42%]">
              <CustomTextField
                label="Title"
                variant="outlined"
                value={todoCreate.title}
                name="title"
                onChange={handleChange}
                fullWidth
              />
            </div>
            <div className="basis-[42%]">
              <DatePicker
                settodoCreate={settodoCreate}
                todoCreate={todoCreate}
              />
            </div>
          </div>
          <div className="flex justify-center mt-5 flex-col">
            <CustomeTextArea
              todoCreate={todoCreate}
              handleChange={handleChange}
            />
            <div
              className="mx-[auto] my-5 w-[70%] sm:w-[45%] md:w-[50%] lg:w-[40%]"
              onClick={() => {
                handleSubmit();
              }}
            >
              <Button
                variant="contained"
                className="bg-[#006D77] hover:bg-[#006D77]"
                fullWidth
              >
                Add Task
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;

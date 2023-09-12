import React from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import Checkbox from "@mui/material/Checkbox";
import { useRouter } from "next/router";
import ContentModeal from "../components/ContentModal";
import axios from "axios";
import toast from "react-hot-toast";


const TaskCard = ({ todoData,deleteTask,setdeleteTask,markedTask,setmarkedTask }: any) => {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(todoData.status)
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    handleMakerd()
  };

  // for function close and open modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  function navigateEditPAge() {
    // Use the router's push method to redirect to the Edit Page
    router.push(`editTask/${todoData._id}`);
  }

  // for delete task
  const handleDelete = async () => {
    try {
     
      await axios.delete(`https://taskdashboard2.onrender.com/api/v1/deletetodo/${todoData?._id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => {
        toast.success(`${data?.data.message}`);
        setdeleteTask(!deleteTask)
   })
    } catch (err:any) {
      return toast.error(err?.response?.data.err);
    }
  }

 
// for change task status 
  const handleMakerd = async () => {
    try {
      await axios.put(`https://taskdashboard2.onrender.com/api/v1/updatetodo/${todoData?._id}`, {
        ...todoData,
        status:!todoData.status
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      }).then((data) => {
        toast.success(`${data?.data.message}fully edited`);
        setmarkedTask(!markedTask)
   })
    } catch (err:any) {
      return toast.error(err?.response?.data.err);
    }
  }
  
  return (
    <div>
      <div className=" bg-[#006D77]  p-[0.7rem] rounded-lg">
        <div className="flex justify-between items-center">
          <p className="leading-[18px] text-[#FFDDD2] text-[1rem] break-all">
            {todoData?.title}
          </p>
          <span className="cursor-pointer" onClick={handleOpen}>
            {" "}
            <AiOutlineInfoCircle color="#FFDDD2" />
          </span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="leading-[14px] text-[#FFDDD2] text-[0.7rem]">
            Due-Date: {todoData?.dueDate}
          </p>
          <span
            className="cursor-pointer"
            onClick={() => {
              navigateEditPAge();
            }}
          >
            {" "}
            <AiOutlineEdit color="#FFDDD2" />
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center">
            <Checkbox
              value={checked}
              checked={checked}
              onChange={handleChange}
              className="border-[#FFDDD2]"
            />
            <p className="leading-[14px] text-[#FFDDD2] text-[0.7rem]">
              Mark as completed
            </p>
          </div>
          <span className="cursor-pointer" onClick={() => {
            handleDelete()
          }}>
            {" "}
            <AiOutlineDelete color="#FFDDD2" />
          </span>
        </div>
      </div>
          <ContentModeal open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} contentData={todoData?.description} />
    </div>
  );
};

export default TaskCard;

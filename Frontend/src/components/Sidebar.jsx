import React from "react";
import {
  IoHomeSharp,
  IoLogOutOutline,
  IoPeopleSharp,
  IoSettingsSharp,
} from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FaTasks } from "react-icons/fa";
import { Link, Links } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 w-52  flex py-20  justify-between h-screen items-center flex-col text-white">
      <div className="itemsList flex  flex-col content-center  gap-6 w-5/6">
        <li className="flex border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3  ">
          <Link to={"/"}>
            <div className=" flex pl-8 gap-2 items-center">
              <IoHomeSharp />
              Home
            </div>
          </Link>
        </li>
        <li className="flex border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3 ">
          {" "}
          <Link to={"/Create-Board"}>
            <div className=" flex pl-7 gap-2 items-center">
              <IoMdAdd />
              Create Board
            </div>
          </Link>
        </li>
        <li className="flex  border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3 ">
          <Link to="/people">
            <div className=" flex pl-7 gap-2 items-center">
              <IoPeopleSharp />
              Manage Peoples
            </div>
          </Link>
        </li>
      </div>
      <div className="itemsLast w-5/6 flex flex-col gap-1">
        <li className="flex  border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3 ">
          <div className="flex pl-7 gap-2 items-center">
            <IoSettingsSharp />
            Setting
          </div>
        </li>
        <li className="flex  border-b-2 border-blue-500 rounded-md hover:bg-gray-500 py-3 ">
          <div className=" pl-7 flex gap-2 items-center">
            <IoLogOutOutline />
            Logout
          </div>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { IoMdNotifications } from "react-icons/io";
const TopBar = () => {
  return (
    <div className="flex px-4 bg-gray-800 items-center justify-between p-2 text-white shadow-[0px_-1px_3px_2px_rgba(0,0,0,0.25)] ">
      <div className="logo flex flex-col">
        <div className="text-3xl font-bold bg text-blue-500">TaskFlow</div>
        <p className=" text-xs font-mono text-white ">
          Your Productivity Partner
        </p>
      </div>
      <div className="search">
        <input
          type="text"
          name=""
          id="search "
          placeholder="Search...."
          className="w-80 px-5 bg-gray-600 rounded-lg "
        />
      </div>
      <div className="flex s items-center space-x-5  ">
        <IoMdNotifications className="w-5 h-5" />
        <img
          class="inline-block size-6 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default TopBar;

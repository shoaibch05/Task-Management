import React from "react";
import { useState } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import { BoardView } from "./BoardView";
import CreateBoardModal from "./SmallComponents/CreateBoardModal";

import Board from "./Board";

const Dashboard = ({ boards }) => {
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleBoardClick = (id) => {
    setSelectedBoardId(id);
  };
  return (
    <>
      <TopBar />
      <div className="flex bg-gray-700">
        <Sidebar />
        <div className="p-8 flex-1">
          {!selectedBoardId ? (
            <>
              <h2 className="text-xl font-bold text-white mb-6">Your Boards</h2>
              <CreateBoardModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onCreate={(boardData) => {
                  console.log("Board Created:", boardData);
                  setModalOpen(false);
                }}
              />
              <div className="flex gap-4 flex-wrap">
                {boards.map((board) => (
                  <Board
                    key={board.id}
                    title={board.title}
                    color={board.color}
                    onClick={() => handleBoardClick(board.id)}
                  />
                ))}
                <Board
                  title="+ Create"
                  color="bg-gray-600 text-gray-800"
                  onClick={() => setModalOpen(true)}
                />
              </div>
            </>
          ) : (
            <BoardView boardId={selectedBoardId} />
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

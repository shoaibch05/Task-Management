import { useState } from "react";
import InviteModal from "./SmallComponents/Invite";
import UserDetailModal from "./SmallComponents/UserDetailModel";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

export default function People({ boards }) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleInvite = (newUser) => {
    const newUserWithId = {
      ...newUser,
      id: Date.now(),
    };
    setUsers((prev) => [...prev, newUserWithId]);
    setShowInviteModal(false);
  };

  const getBoardTitle = (id) => boards.find((b) => b.id === id)?.title || "";

  return (
    <>
      <TopBar />
      <div
        className="flex *:
    "
      >
        <Sidebar />

        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Team Members</h2>

          <button
            onClick={() => setShowInviteModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Invite Member
          </button>

          {/* User List */}
          <ul className="mt-6 space-y-2">
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="text-white w-56 bg-gray-800 p-3 rounded cursor-pointer hover:bg-gray-700"
              >
                {user.name}
              </li>
            ))}
          </ul>

          <InviteModal
            isOpen={showInviteModal}
            onClose={() => setShowInviteModal(false)}
            onInvite={handleInvite}
            boards={boards}
          />

          {/* User Details Modal */}
          {selectedUser && (
            <UserDetailModal
              user={selectedUser}
              boards={boards}
              onClose={() => setSelectedUser(null)}
            />
          )}
        </div>
      </div>
    </>
  );
}

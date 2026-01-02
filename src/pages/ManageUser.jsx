import { useEffect, useState } from "react";
import { Check, X, User,Pause } from "lucide-react";
import { toast } from "react-toastify";
import { getAllUser } from "../api/user";
import { updateUserStatus } from "../api/user";
// import { getPendingUsers, approveUser, rejectUser } from "../api/admin";

const statusColor = (status) => {
  switch (status) {
    case "approved":
      return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    case "rejected":
      return "text-red-400 bg-red-500/10 border-red-500/30";
    case "pending":
      return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
    default:
      return "text-gray-400 bg-gray-500/10 border-gray-500/30";
  }
};

function ManageUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [change,setChange] = useState(false)

  const fetchUsers = async () => {
    setLoading(true);
    try {
        const res = await getAllUser();
        setUsers(res)
    } catch {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [change]);

  const handleStatus = async (id,status) => {
    try {
        setChange(false)
    const res = await updateUserStatus(id,status);
      toast.success(`User Status Changed To ${status}`);
      setChange(true)
    } catch {
      toast.error("Some Error Occured!");
    }
  };


  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1
          className="text-4xl font-bold text-white mb-2"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          User Management
        </h1>
        <p className="text-gray-400">
          Approve or reject user registrations
        </p>
      </div>

      {/* USER TABLE */}
      <div className="bg-[#0d1425] border border-cyan-500/30 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#151b2e] text-gray-400">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 && !loading && (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No pending users
                </td>
              </tr>
            )}

            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-cyan-500/10 hover:bg-cyan-500/5 transition"
              >
                <td className="p-4 flex items-center gap-3">
                  <div className="p-2 bg-cyan-500/10 rounded-full">
                    <User size={18} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.username}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </td>

                <td className="p-4 text-white capitalize">
                  {user.role}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleStatus(user.id,"APPROVED")}
                        className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        onClick={() => handleStatus(user.id,"PENDING")}
                        className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition"
                      >
                        <Pause size={16} />
                      </button>

                      <button
                        onClick={() => handleStatus(user.id,'REJECTED')}
                        className="px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageUser;

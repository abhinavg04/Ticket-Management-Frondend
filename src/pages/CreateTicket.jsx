import { useEffect, useState } from "react";
import {
  Plus,
  User,
  AlertCircle,
  FileText,
  Calendar,
  Layers,
  Send,
  X
} from "lucide-react";
import { createTicket } from "../api/ticket";
import { getAllUser } from "../api/user";
import { useUser } from "../context/UserContext";

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    reported_by:"",
    issue_description:"",
    assigned_to: "",
    priority: "Medium",
    status:"Open",
    category: "",
  });
  const { user } = useUser();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };
  const [users,setUsers] = useState([])

useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await getAllUser();
      console.log(res)
      setUsers(res);
    } catch (error) {
        console.error(error);
    }
};

fetchUsers();
console.log(users)
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        formData.reported_by = user.id
        console.log(formData);
        
        const res = await createTicket(formData);
        console.log(res);
    }
    catch{

    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            CREATE NEW TICKET
          </h1>
          <p
            className="text-gray-400 mt-2"
            style={{ fontFamily: "Space Mono, monospace" }}
          >
            Raise a new network / ICT incident
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#0d1425]/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 space-y-6"
        >

          {/* Title */}
          {/* <div>
            <label className="text-gray-300 text-sm mb-2 flex items-center gap-2">
              <FileText size={16} /> Ticket Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Eg: WiFi connectivity issue in 3rd floor"
              className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              style={{ fontFamily: "Space Mono, monospace" }}
            />
          </div> */}

          {/* Description */}
          <div>
            <label className="text-gray-300 text-sm mb-2 flex items-center gap-2">
              <AlertCircle size={16} /> Issue Description
            </label>
            <textarea
              name="issue_description"
              rows="4"
              required
              value={formData.issue_description}
              onChange={handleChange}
              placeholder="Describe the issue in detail..."
              className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              style={{ fontFamily: "Space Mono, monospace" }}
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Category */}
            <div>
              <label className="text-gray-300 text-sm mb-2 flex items-center gap-2">
                <Layers size={16} /> Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                <option value="">Select Category</option>
                <option>Network</option>
                <option>WiFi</option>
                <option>Security</option>
                <option>Hardware</option>
                <option>Software</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="text-gray-300 text-sm mb-2 flex items-center gap-2">
                <AlertCircle size={16} /> Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            {/* Assigned To */}
            <div>
              <label className="text-gray-300 text-sm mb-2 flex items-center gap-2">
                <User size={16} /> Assign To
              </label>
               <select
                name="assigned_to"
                value={formData.assigned_to}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white"
                style={{ fontFamily: "Space Mono, monospace" }}
              >
                <option value="">Select User</option>
                {
                    users.map((e)=>(
                        <option key={e.id} value={e.id}>{e.username}</option>
                    ))
                }
              </select>
            </div>

            {/* Due Date */}
            {/* <div>
              <label className="text-gray-300 text-sm mb-2 flex items-center gap-2">
                <Calendar size={16} /> Due Date
              </label>
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#151b2e] border border-cyan-500/30 rounded-lg text-white"
                style={{ fontFamily: "Space Mono, monospace" }}
              />
            </div> */}

          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="px-6 py-3 bg-[#151b2e] border border-cyan-500/30 text-gray-400 rounded-lg hover:border-cyan-400"
            >
              <X size={18} />
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <Send size={18} />
              CREATE TICKET
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateTicket;

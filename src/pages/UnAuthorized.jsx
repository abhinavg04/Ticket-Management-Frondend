import { Link } from "react-router";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a] text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-red-500">403</h1>
        <p className="text-gray-400">Access Denied</p>

        <Link
          to="/dashboard"
          className="px-6 py-2 bg-cyan-600 rounded hover:bg-cyan-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;

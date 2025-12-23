import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0e1a] text-white">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <p className="text-gray-400">Page Not Found</p>
        <p className="text-muted mb-4">
          The page you’re trying to access doesn’t exist or you may not have permission.
        </p>

        <Link
          to="/"
          className="px-6 py-2 bg-cyan-600 rounded hover:bg-cyan-700"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

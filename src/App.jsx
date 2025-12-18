import { createBrowserRouter, RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/Home";
import AllTickets from "./pages/AllTickets";
import CreateTicket from "./pages/CreateTicket";
import Unauthorized from "./pages/UnAuthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import AssignedTickets from "./pages/AssignedTickets";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/reg", element: <Register /> },
    { path: "/unauthorized", element: <Unauthorized /> },

    {
      path: "/dashboard",
      element: <HomePage />,
      children: [
        { index: true, element: <Dashboard /> },

        // 🔐 ADMIN PROTECTED ROUTE
        {
          element: <ProtectedRoute roles={["admin"]} />,
          children: [
            { path: "all-tickets", element: <AllTickets /> },
          ],
        },

        // 👤 ANY AUTH USER
        {
          element: <ProtectedRoute roles={["admin","user"]}/>,
          children: [
            { path: "create-tickets", element: <CreateTicket /> },
          ],
        },
        // 👤 ANY AUTH USER
        {
          path:"assigned-tickets",
          element: <AssignedTickets />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;

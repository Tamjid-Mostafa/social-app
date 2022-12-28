import { createBrowserRouter } from "react-router-dom";
import Error404 from "../components/404";
import Main from "../Layout/Main";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import Login from "../pages/Register/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <Error404 />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/about",
                element: <PrivateRoute><About /></PrivateRoute>
            }
        ]
    }
])


export default router;
import { createBrowserRouter } from "react-router-dom";
import Error404 from "../components/404";
import PostDetails from "../components/PostDetails";
import Main from "../Layout/Main";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import Media from "../pages/Media/Media";
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
            },
            {
                path: "/media",
                element:<PrivateRoute><Media /></PrivateRoute>
            },
            {
                path: "/post-details/:id",
                element: <PrivateRoute><PostDetails /></PrivateRoute>,
                loader: ({ params }) =>
                fetch(`http://localhost:5000/post/${params.id}`),
            }
        ]
    }
])


export default router;
import { createBrowserRouter} from "react-router" // react-router-dom now changed to react-router 
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import App from "./App"

import {Navigate } from "react-router"

//  creating dommy pages not exact ui
//  router creater with two routes
export const router = createBrowserRouter([
    {
        path: "/", // for now set "/" route to login
        element: <Navigate to="/login" replace />

    },
    {
        path: "/login",
        element:<Login />
    },
    {
        path: "/register",
        element:<Register />
    },
])


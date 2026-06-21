import { createBrowserRouter} from "react-router" // react-router-dom now changed to react-router 
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import App from "./App"

import {Navigate } from "react-router"
import Protected from "./features/auth/components/Protected"
import Home from "./features/interview/pages/Home"
import Interview from "./features/interview/pages/Interview"

//  creating dommy pages not exact ui
//  router creater with two routes
export const router = createBrowserRouter([
    // {
    //     path: "/", // for now set "/" route to login
    //     element: <Navigate to="/login" replace />

    // },
    {
        path: "/login",
        element:<Login />
    },
    {
        path: "/register",
        element:<Register />
    },
    // {
    //     path: "/",
    //     element: <h1>Home Page</h1> // dummy route for testing the login navigation etc
    // }
    {
        path: "/",
        // element: <Protected><h1>Home Page</h1></Protected> // using our real Home page instead of dummy
        element: <Protected><Home/></Protected>
    },
    {
        path:"/interview/:interviewId",
        element: <Protected><Interview/></Protected>
    }
])


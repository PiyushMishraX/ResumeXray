import { createBrowserRouter } from "react-router" // react-router-dom now changed to react-router 
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"

//  creating dommy pages not exact ui
//  router creater with two routes
export const router = createBrowserRouter([
    {
        path: "/login",
        element:<Login/>
    },
    {
        path: "/register",
        element:<Login/>
    },
])
import { useContext } from "react";
import { AuthContext } from "../auth.context"; // im[port state layer partscv]
import { login, register, logout, getMe} from "../services/auth.api" // import api layer parts

export const useAuth = ()=>{

    const context = useContext(AuthContext)
    // we get these from auth.context user, setUser, loading, setUser
    const { user, setUser, loading, setLoading} = context

     // and login api calling part is in api layer
     // loading ( ui ) while the api functions are being called // loading screen part is in ui 
     // setting the loading to true is part of hook layer
     // checkig the auth.api ( api layer) for which apis to manage + backend/backend documentation for the response from apis
    const handleLogin = async ({ email, password}) =>{
        setLoading(true)
        const data = await login({ email, password})

        setUser(data.user)
        setLoading(false)
    }

    const handleRegister = async ({ username, email, password}) =>{
        setLoading(true)
        const data = await register({ username, email, password})

        setUser(data.user)
        setLoading(false)
    }

    const handleLogout = async ({ email, password}) =>{
        setLoading(true)
        const data = await logout()

        setUser() // logout returns nothing
        setLoading(false)
    }

    return { user, laoding ,handleRegister, handleLogin, handleLogout  }

    

}

// useAuth is COsutom Hook
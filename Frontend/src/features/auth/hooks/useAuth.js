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
    const handleLogin = async ({ email, password}) =>{
        setLoading(true)
        const data = await login({ email, password})
    }

}
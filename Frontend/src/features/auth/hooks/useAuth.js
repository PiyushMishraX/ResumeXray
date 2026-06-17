import { useContext, useEffect } from "react";
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
        try {     
            const data = await login({ email, password})
    
            setUser(data.user)
        } catch (err) {
            
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async ({ username, email, password}) =>{
        setLoading(true)
        try {     
            const data = await register({ username, email, password})

            setUser(data.user)
        } catch (err) {
            
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async ({ email, password}) =>{
        setLoading(true)
        try {
            const data = await logout()
    
            setUser() // logout returns nothing
            
        } catch (err) {
            
        } finally {
            setLoading(false)
        }
    }

     useEffect(() => {
      
        const getANdSetUser = async ()=> {
            try {
                const data = await getMe()
                setUser(data.user)
                // try catch for when te token gets required and the website shows error on loading
                
            } catch (err) {
                
            } finally {
                setLoading(false)
            }
        } 

        getANdSetUser()
    
    }, [])

    return { user, loading ,handleRegister, handleLogin, handleLogout  }

    

}

// useAuth is COsutom Hook
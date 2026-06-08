import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    // const [loading, setLoading] = useState(false)
    const [loading, setLoading] = useState(true)
    
    

    // we hydrate the user in the production , page relaod ke baad rehydrate karna hota hai use ko ( this is topic for future ) , so by default we setLoading to true

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}} >
            {children}
        </AuthContext.Provider>
    )

    //  auth Provider ke andar application wrap karna hai
    // this gives whole applicaiton access to user, setUser, loading, setUser
    //  but we not use them directly 
    // we use hook layer to manage them , state layer and api layer




}
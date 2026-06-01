import { createContext, useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)

    // we hydrate the user in the production , page relaod ke baad rehydrate karna hota hai use ko ( this is topic for future ) , so by default we setLoading to true

    return (
        <AuthContext.Provider value={{use, setUser, loading, setUser}} >
            {children}
        </AuthContext.Provider>
    )

    //  auth Provider ke andar application wrap karna hai




}
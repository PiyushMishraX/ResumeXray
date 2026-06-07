import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

import React, { Children } from 'react'

// this protected route is a wrapper children is inside it and we return children part if everything is correct 
const Protected = ({Children}) => {

    const { loading, user } = useAuth()
    const navigate = useNavigate()

    if(loading) {
        return (<main><h1>Loading.....</h1></main>)
    }

    // if user not logged in then navigate user to log in page
    if(!user){
        navigate('/login')
    }
  return children
}

export default Protected
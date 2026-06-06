// full code of login page
// and components folder the reapeating elements are present such as input etc


import React, { useState } from 'react'
import "../auth.form.scss"
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()

    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault() // stop the reload
        handleLogin({email, password}) // handle login handles all the logic/business logic and not have to write it in ui
    }

    if(loading) {
        return ( <main><h1>Loading........</h1></main>)
    }

  return (
    <main> {/* every page iside the main block */}
    <div className="form-container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit} > 
            {/* actions written from js */}

            <div className="input-group">
                <label htmlFor='email'>Email</label>
                <input
                 onChange={(e)=>{
                    setEmail(e.target.value)
                 }}
                 type="email" id='email' name='email' placeholder='Enter email address'/>
            </div>
            <div className="input-group">
                <label htmlFor='password'>Password</label>
                <input
                 onChange={(e)=>{
                    setPassword(e.target.value)
                 }}
                 type="password" id='password' name='password' placeholder='Enter password'/>
            </div>

            <button className='button primary-button'>Login </button>

        </form>

        <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
    </div>


    </main>
  )
}

export default Login
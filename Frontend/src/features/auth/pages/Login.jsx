// full code of login page
// and components folder the reapeating elements are present such as input etc


import React from 'react'

const Login = () => {
  return (
    <main> {/* every page iside the main block */}
    <div className="form-container">
        <h1>Login</h1>

        <form > 
            {/* actions written from js */}

            <div className="input-group">
                <label htmlFor='email'>Email</label>
                <input type="email" id='email' name='email' placeholder='Enter email address'/>
            </div>
            <div className="input-group">
                <label htmlFor='password'>Email</label>
                <input type="password" id='password' name='password' placeholder='Enter password'/>
            </div>

            <button className='button primary-button'>Login </button>

        </form>
    </div>


    </main>
  )
}

export default Login
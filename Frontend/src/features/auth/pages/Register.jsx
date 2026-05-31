import React from 'react'

const Register = () => {

  const handleSubmit = (e) =>{
        e.preventDefault() // stop the reload
    }

  return (
    <main>
    <div className="form-container">

        <form onSubmit={handleSubmit} > 

            <div className="input-group">
                <label htmlFor='username'>Username</label>
                <input type="text" id='username' name='email' placeholder='Enter username'/>
            </div>
            <div className="input-group">
                <label htmlFor='email'>Email</label>
                <input type="email" id='email' name='email' placeholder='Enter email address'/>
            </div>
            <div className="input-group">
                <label htmlFor='password'>Password</label>
                <input type="password" id='password' name='password' placeholder='Enter password'/>
            </div>

            <button className='button primary-button'>Register </button>

        </form>

        
    </div>

    </main>
  )
}

export default Register
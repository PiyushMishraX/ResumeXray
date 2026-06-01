//  in this file we write fully how frontend interacts with backend
// we wirte a.b.js instead of .jsx because it distinguise between functionality and react
// total 4 apis on backend

//  package needed for frontend to communicate with backend or easily communicate wiht backend --> axios

import axios from "axios"

export async function register ({username , email , password}) {

  axios.post("https://localhost:3000/api/auth/register",{
    username, email, password
  },{
    withCredentials: true

    //  axios by default do not give server the access of cookies so we set it using a flag with credentials true
    //  now server have access that it can access , read or set data on and from cookies

  })


}

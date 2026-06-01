//  in this file we write fully how frontend interacts with backend
// we wirte a.b.js instead of .jsx because it distinguise between functionality and react
// total 4 apis on backend


//  package needed for frontend to communicate with backend or easily communicate wiht backend --> axios

import axios from "axios"

export async function register ({username , email , password}) {

  try {

    const response = await axios.post("https://localhost:3000/api/auth/register",{
      username, email, password
    },{
      withCredentials: true
      
      //  axios by default do not give server the access of cookies so we set it using a flag with credentials true
      //  now server have access that it can access , read or set data on and from cookies
      
    })

    return response.data
    
  }catch (err){

    console.log(err)

  }



}



export async function login ({ email , password}) {

  try {
    
    const response = await axios.post("http://localhost:3000/api/auth/login", {
      email, password
    }, { withCredentials: true})

    return response.data
    
  }catch (err){
    console.log(err)
  }

}

export async function logout(){
  try {
    const response = await axios.get("http://localhost:3000/api/auth/logout", {
      withCredentials: true
    }) // this api do not need anything so no need to give anything 
    return response.data
  } catch (err) {
    console.log(err)    
  }
}

export async function getMe(){

  try {
    const response = await axios.get("http://localhost:3000/api/auth/getme", {
      withCredentials: true
    })
    return response.data
    
  } catch (err) {
    
  }

  
}
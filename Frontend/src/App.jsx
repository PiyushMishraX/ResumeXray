// import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from "./app.routes.jsx" // do not dforget to add .jsx extension else will give error , probably because of small letter app

import { AuthProvider } from './features/auth/auth.context.jsx'
import { InterviewProvider } from './features/interview/interview.context.jsx'

const App = () => {
  return (
     <AuthProvider >
      <InterviewProvider>
        <RouterProvider router={router}/>
      </InterviewProvider>
     </AuthProvider>
     
  )
}

export default App
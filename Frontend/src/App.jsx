// import React from 'react'
import { RouterProvider } from 'react-router'
import { router } from "./app.routes.jsx" // do not dforget to add .jsx extension else will give error , probably because of small letter app


const App = () => {
  return (
     <>
      <RouterProvider router={router}/>
     </>
  )
}

export default App
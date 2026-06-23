import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})



export const generateInterviewReport = ({ jobDescription, selfDescription }) => {

     const formData = new FormData() // formData format becuase file can be send to server in backend through form data format from frontend
     formData.append("jobDescription", jobDescription)
     formData.append("selfDescription", selfDescription)
     formData.append("resume", resumeFile)

     const response = await api.post("/api/interview", formData, {
        headers: {
            "Content-Type" : "multipart/form-data"
        }
     })

     return response.data
}


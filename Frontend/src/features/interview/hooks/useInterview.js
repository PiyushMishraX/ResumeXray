import { generateInterviewReport, getAllInterviewReports, getInterviewReportById } from "../services/interview.api"; // to manage api layer
import { useContext } from "react";
import { InterviewContext } from "../interview.context"; // too manage context layer

export const useInterview = () => {

    const context = useContext(InterviewContext)

    if(!context ) {
        throw new Error("useInterview mus tbe within an InterviewProvider")
    } // this occurs when we try to access our context outside our Provider

    const { loading , setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        try{
            const response = await generateInterviewReport({ jonDescriptiom, selfDescription, resumeFile})
            setReport(response.interviewReport)
        } catch (error){
            console.llog(error)
        } finally {
            setLoading(false)
        }
    } 


}
import { generateInterviewReport, getAllInterviewReports, getInterviewReportById } from "../services/interview.api"; // to manage api layer
import { useContext } from "react";
import { InterviewContext } from "../interview.context"; // too manage context layer

export const useInterview = () => {

    const context = useContext(InterviewContext)

    if(!context ) {
        throw new Error("useInterview must be within an InterviewProvider")
    } // this occurs when we try to access our context outside our Provider

    const { loading , setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        try{
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile})
            setReport(response.interviewReport)
        } catch (error){
            console.log(error)
        } finally {
            setLoading(false)
        }
    } 

    // to fetch info of report by Id
    const getReportById = async (interviewId) => {
        setLoading(true)
        try {
            const reponse = await getInterviewReportById(interviewId)
        } catch (error) {
            console.log(erro)
        } finally {
            setLoading(false)
        }
    }

    // to get all interview reports
    const getReports = async () => {
        setLoading(true)
        try {
            const reponse = await getAllInterviewReports(interviewId)
        } catch (error) {
            console.log(erro)
        } finally {
            setLoading(false)
        }
    }


    return { loading, setLoading, reports, generateReport, getReports, getReportById}


}
import { generateInterviewReport, getAllInterviewReports, getInterviewReportById } from "../services/interview.api"; // to manage api layer
import { useContext } from "react";
import { InterviewContext } from "../interview.context"; // too manage context layer
import { useEffect } from "react";
import { useParams } from "react-router";

export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if(!context ) {
        throw new Error("useInterview must be within an InterviewProvider")
    } // this occurs when we try to access our context outside our Provider

    const { loading , setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        let response = null
        try{
            // const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile}) // have to return response
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile})
            // console.log(response) // for debuga
            setReport(response.interviewReport) 
            // console.log(report)
        } catch (error){
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response.interviewReport // although we are setting the report but we need the return to pass the id etc to the calling part
    } 

    // to fetch info of report by Id
    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            // console.log(response);
            setReport(response.interviewReport) 
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
            // console.log("finally");
            
        }
        
        return response.interviewReport
    }

    // to get all interview reports
    const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports(interviewId)
            setReports(response.interviewReports)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

        return response.interviewReport

    }

    useEffect(()=>{
        if(interviewId){
            getReportById(interviewId)
        } else {
            getReports() // it fetches atleast once when website starts
        }
    }, [ interviewId ])

    return { loading, report, setLoading, reports, generateReport, getReports, getReportById}


}
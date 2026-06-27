import { createContext, useState } from "react";

export const InterviewContext = createContext() // next createing provider of the context

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(null)
    const [reports, setReports] = useState([])

    return (
        <InterviewContext.Provider value= {{ loading, setLoading, report, setReport, reports, setReports }} >
            {children}
        </InterviewContext.Provider>
    )

}
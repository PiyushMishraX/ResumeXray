// import React from 'react'
// import '../style/home.scss'

// const Home = () => {
//   return (
//     <main className='home'>
//         <div className="interview-input-group">

//             <div className="left">
//                 <label htmlFor='jobDescription'>Job Description</label>
//                 <textarea name='jonDescription' id='jobDescription' placeholder='Enter job description here...' ></textarea>
//             </div>
//             <div className="right">
//                 <div className="input-group">
//                     <p>Resume <small className='highlight'>(Use Resume and self description together for best Results.)</small></p>
//                     <label className='file-label' htmlFor='resume' >Upload resume</label>
//                     <input hidden type="file" name='resume' id='resume' accept='.pdf' />
//                 </div>
//                 <div className="input-group">
//                     <label htmlFor='selfDescription' >Self Description</label>
//                     <textarea name="selfDescription" id="selfDescription" placeholder='Describe yourself in a few sentences...'></textarea>
//                 </div>
//                 {/* <button className='generate-btn'>Generate Interview Report</button> */}
//                 <button className='button primary-button'>Generate Interview Report</button>
//             </div>
//         </div>
//     </main>
//   )
// }

// export default Home




import React, { useRef, useState } from 'react';
import '../style/home.scss';
import { useInterview } from '../hooks/useInterview'; // returns or givess as things
import { useNavigate } from "react-router";

const Home = () => {

  const { laoding, generateReport } = useInterview()

  // state variables for two way binding of text areas
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const resumeInputRef =  useRef()

  const navigate = useNavigate()



  return (
    <main className="home">
      <header className="page-header">
        <h1>
          Create Your Custom <span className="highlight-gradient">Interview Plan</span>
        </h1>
        <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
      </header>

      <div className="interview-card">
        <div className="card-body">
          {/* Left Column */}
          <div className="left">
            <div className="section-header">
              <div className="title">
                <span className="icon">💼</span> Target Job Description
              </div>
              <span className="badge-required">Required</span>
            </div>
            <div className="textarea-wrapper">
              <textarea
                onChange={(e)=>{setJobDescription(e.target.value)}}
                name="jobDescription"
                id="jobDescription"
                placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
              ></textarea>
              <span className="char-count">0 / 5000 chars</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="right">
            <div className="section-header">
              <div className="title">
                <span className="icon">👤</span> Your Profile
              </div>
            </div>

            <div className="input-group">
              <p className="label-text">
                Upload Resume <small className="highlight-text">(Best Results)</small>
              </p>
              <label className="dropzone" htmlFor="resume">
                <div className="upload-icon">☁️</div>
                <p className="upload-title">Click to upload or drag & drop</p>
                <p className="upload-subtitle">PDF or DOCX (Max 5MB)</p>
                <input ref={resumeInputRef} hidden type="file" name="resume" id="resume" accept=".pdf,.docx" />
              </label>
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="input-group">
              <label className="label-text" htmlFor="selfDescription">
                Quick Self-Description
              </label>
              <textarea
                onChange={(e)=>{setSelfDescription(e.target.value)}}
                name="selfDescription"
                id="selfDescription"
                className="small-textarea"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
              ></textarea>
            </div>

            <div className="info-alert">
              <span className="info-icon">ℹ️</span>
              <p>
                Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
              </p>
            </div>
          </div>
        </div>

        <div className="card-footer">
          <p className="footer-status">AI-Powered Strategy Generation • Approx 30s</p>
          <button 
            onClick={}
            className="generate-btn">
            <span className="btn-icon">✨</span> Generate My Interview Strategy
          </button>
        </div>
      </div>

      <footer className="page-footer">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#help">Help Center</a>
      </footer>
    </main>
  );
};

export default Home;
import React, { useState } from 'react';
import '../style/interview.scss';

// Using your provided JSON structure
const mockData = {
  "_id": { "$oid": "6a2e8ed53eca2c537455abbf" },
  "matchScore": 0,
  "technicalQuestions": [
    {
      "question": "Can you walk me through your technical background and key projects?",
      "intention": "To assess the candidate's core competencies and technical depth in the absence of specific job details.",
      "answer": "Structure your answer using the STAR method (Situation, Task, Action, Result), focusing on projects that highlight problem-solving skills and technical proficiency."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Tell me about a time you faced a significant challenge in a team environment. How did you resolve it?",
      "intention": "To evaluate interpersonal skills, teamwork, and conflict resolution abilities.",
      "answer": "Focus on a specific conflict, the steps taken to communicate effectively, and the positive outcome achieved."
    }
  ],
  "skillGaps": [
    {
      "skill": "Role-specific technical skills",
      "severity": "high"
    },
    {
      "skill": "Redis",
      "severity": "medium"
    },
    {
      "skill": "Event loop",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Research and Analysis",
      "tasks": [
        "Reach out to the recruiter for a detailed job description",
        "Research the company's tech stack and current projects"
      ]
    }
  ],
  "user": { "$oid": "6a19b794629f0a97a7596145" },
  "__v": 0
};

// Inline SVG Icons
const Icons = {
  Code: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  ),
  Users: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  Map: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
      <line x1="8" y1="2" x2="8" y2="18"></line>
      <line x1="16" y1="6" x2="16" y2="22"></line>
    </svg>
  ),
  ChevronDown: ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  )
};

const Interview = () => {
  const [activeTab, setActiveTab] = useState('technical');
  const [openQId, setOpenQId] = useState(0);

  const toggleQuestion = (index) => {
    setOpenQId(openQId === index ? null : index);
  };

  const renderContent = () => {
    if (activeTab === 'technical' || activeTab === 'behavioral') {
      const questions = activeTab === 'technical' ? mockData.technicalQuestions : mockData.behavioralQuestions;
      const title = activeTab === 'technical' ? 'Technical Questions' : 'Behavioral Questions';

      return (
        <section>
          <div className="content-header">
            <h2>{title}</h2>
            <span className="content-header__count">{questions.length}</span>
          </div>
          <div className="q-list">
            {questions.map((q, idx) => (
              <div key={idx} className="q-card">
                <div className="q-card__header" onClick={() => toggleQuestion(idx)}>
                  <span className="q-card__index">Q{idx + 1}</span>
                  <h3 className="q-card__question">{q.question}</h3>
                  <Icons.ChevronDown 
                    className={`q-card__chevron ${openQId === idx ? 'q-card__chevron--open' : ''}`} 
                  />
                </div>
                {openQId === idx && (
                  <div className="q-card__body">
                    <div className="q-card__section">
                      <span className="q-card__tag q-card__tag--intention">Intention</span>
                      <p>{q.intention}</p>
                    </div>
                    <div className="q-card__section">
                      <span className="q-card__tag q-card__tag--answer">How to Answer</span>
                      <p>{q.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      );
    }

    if (activeTab === 'roadmap') {
      return (
        <section>
          <div className="content-header">
            <h2>Preparation Road Map</h2>
            <span className="content-header__count">{mockData.preparationPlan.length} Days</span>
          </div>
          <div className="roadmap-list">
            {mockData.preparationPlan.map((plan, idx) => (
              <div key={idx} className="roadmap-day">
                <div className="roadmap-day__header">
                  <span className="roadmap-day__badge">Day {plan.day}</span>
                  <h3 className="roadmap-day__focus">{plan.focus}</h3>
                </div>
                <ul className="roadmap-day__tasks">
                  {plan.tasks.map((task, tIdx) => (
                    <li key={tIdx}>
                      <span className="roadmap-day__bullet"></span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      );
    }
  };

  return (
    <div className="interview-page">
      <div className="interview-layout">
        
        {/* Left Navigation */}
        <nav className="interview-nav">
          <div>
            <div className="interview-nav__label">Interview Prep</div>
            <button 
              className={`interview-nav__item ${activeTab === 'technical' ? 'interview-nav__item--active' : ''}`}
              onClick={() => setActiveTab('technical')}
            >
              <span className="interview-nav__icon"><Icons.Code /></span>
              Technical questions
            </button>
            <button 
              className={`interview-nav__item ${activeTab === 'behavioral' ? 'interview-nav__item--active' : ''}`}
              onClick={() => setActiveTab('behavioral')}
            >
              <span className="interview-nav__icon"><Icons.Users /></span>
              Behavioral questions
            </button>
            <button 
              className={`interview-nav__item ${activeTab === 'roadmap' ? 'interview-nav__item--active' : ''}`}
              onClick={() => setActiveTab('roadmap')}
            >
              <span className="interview-nav__icon"><Icons.Map /></span>
              Road Map
            </button>
          </div>
        </nav>

        <div className="interview-divider"></div>

        {/* Center Main Content */}
        <main className="interview-content">
          {renderContent()}
        </main>

        <div className="interview-divider"></div>

        {/* Right Sidebar */}
        <aside className="interview-sidebar">
          
          <div className="match-score">
            <h3 className="match-score__label">Role Match</h3>
            <div className={`match-score__ring ${
              mockData.matchScore > 75 ? 'score--high' : 
              mockData.matchScore > 40 ? 'score--mid' : 'score--low'
            }`}>
              <span className="match-score__value">{mockData.matchScore}</span>
              <span className="match-score__pct">%</span>
            </div>
            <p className="match-score__sub">Based on resume</p>
          </div>

          <div className="sidebar-divider"></div>

          <div className="skill-gaps">
            <h3 className="skill-gaps__label">Skill Gaps</h3>
            <div className="skill-gaps__list">
              {mockData.skillGaps.map((gap, idx) => (
                <span 
                  key={idx} 
                  className={`skill-tag skill-tag--${gap.severity}`}
                >
                  {gap.skill}
                </span>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Interview;
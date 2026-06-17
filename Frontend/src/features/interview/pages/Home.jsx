import React from 'react'
import '../style/home.scss'

const Home = () => {
  return (
    <main className='home'>
        <div className="interview-input-group">

            <div className="left">
                <textarea name='jonDescription' id='jobDescription' placeholder='Enter job description here...' ></textarea>
            </div>
            <div className="right">
                <div className="input-group">
                    <label htmlFor='resume' >Upload resume</label>
                    <input type="file" name='resume' id='resume' accept='.pdf' />
                </div>
                <div className="input-group">
                    <label htmlFor='selfDescription' >Upload resume</label>
                    <input type="file" name='selfDescription' id='selfDescription' accept='.pdf' />
                </div>
            </div>
        </div>
    </main>
  )
}

export default Home
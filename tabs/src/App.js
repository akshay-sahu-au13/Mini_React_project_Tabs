import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'
function App() {
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const [jobs, setJobs] = useState({});
  const [value, setValue] = useState(0);

  useEffect(()=>{
    fetch(url)
    .then(res=>res.json())
    .then(data=> {
      console.log(data);
      setInfo(data);
      setJobs(data[0])
      setLoading(false);
      
    })
    .catch(e=>{
      console.log(e.message)
      return <h1>Error while fetching data</h1>
    })
  },[]);

  const handleClick = (e)=> {
    console.log(e.target.innerText)
    const jobData = info.filter(job=>{
      return e.target.innerText === job.company;
    })
    console.log(jobData[0].duties);
    setJobs(jobData[0]);

  }

  if (loading){
    return <div className="loading" >
      <h1>Loading...</h1>
    </div>
  }

  const {title, company, dates, duties} = info[value];
  console.log("Duties:::", duties)

  return <>
  
    
      <section className="section">
        <div className="title">
          <h2>Experience</h2>
          <div className="underline"></div>
        </div>
        <div className="jobs-center">
          <div className="btn-container">
            {
              info.map((job,index)=>{
                return <button key={job.id} className={`job-btn ${index === value && 'active-btn'}`} onClick={() => setValue(index)}>{job.company}</button>
              })
            }
          </div>
          
            <article className="job-info">
              <h3>{title}</h3>
              <h4>{company}</h4>
              <p className="job-date">{dates}</p>
              {
                duties.map((duty, index)=>{
                  return <div key={index} className="job-desc">
                    <FaAngleDoubleRight className="job-icon"></FaAngleDoubleRight>
                    <p>{duty}</p>
                  </div>
                })
              }
            </article>
        </div>
        
        <button className="btn">More Info</button>
      </section>
    {/* <Job /> */}

  
  </>
}


// const Job = ()=> {

// }

export default App

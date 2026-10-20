import Navbar from "./components/Navbar"
import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import JobCard from "./components/JobCard"
import jobData from "./JobDummyData"
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, where, getDocs } from "firebase/firestore";
import {db} from "./firebase.config"
import AIRecommendation from "./AIRecommendation";
function App() {
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async()=>{
  const tempJobs = []
  const jobsRef = query(collection(db, "jobs"));
  const q = query(jobsRef, orderBy("postedOn","desc"));
  const req = await getDocs(q);
  req.forEach((job) => {
  // console.log(doc.id, " => ", doc.data());
  tempJobs.push({
    ...job.data(),
    id: job.id,
    postedOn: job.data().postedOn.toDate()
  })
  });
  setJobs(tempJobs);
  }
  
  const fetchJobsCustom = async (jobCriteria) => {
    try {
        const conditions = [];

        if (jobCriteria.type) {
            conditions.push(where("type", "==", jobCriteria.type));
        }

        if (jobCriteria.title) {
            conditions.push(where("title", "==", jobCriteria.title));
        }

        if (jobCriteria.experience) {
            conditions.push(where("experience", "==", jobCriteria.experience));
        }

        if (jobCriteria.location) {
            conditions.push(where("location", "==", jobCriteria.location));
        }

        const jobsRef = collection(db, "jobs");

        const q = query(
            jobsRef,
            ...conditions,
            orderBy("postedOn", "desc")
        );

        const req = await getDocs(q);

        const tempJobs = [];

        req.forEach((job) => {
            tempJobs.push({
                ...job.data(),
                id: job.id,
                postedOn: job.data().postedOn.toDate()
            });
        });

        setJobs(tempJobs);

    } catch (error) {
        console.error("Firebase job fetch error:", error);
    }
};

  useEffect(()=>{
    fetchJobs()
  }, [])
  return (
    <div>
      <Navbar />
      <Header />
      <SearchBar fetchJobsCustom={fetchJobsCustom}/>
      {jobs.map((job)=>(
        <JobCard key={job.id}{...job}/>
      ))}
      <AIRecommendation />
      
    </div>
  )
}

export default App



import { useState, useEffect } from "react";

import JoblyApi from "../api/api";

import JobCard from "./JobCard";
import SearchForm from "../common/SearchForm";
import Loading from "../common/Loading";

/** Job List Component
 * 
 * Initial render provides list of all jobs.
 * 
 * Search form filters jobs by search term.
 * 
 * route: /jobs
 * 
 * Other components used: JobCard, SearchForm, Loading
 */

const JobList = () => {
    console.debug("JobList");

    const [jobs, setJobs] = useState(null);

    useEffect(function getAllJobsOnMount() {
        console.debug("JobList useEffect getAllJobsOnMount");
        search();
    }, []);

    async function search(term) {
        let jobs = await JoblyApi.getAllJobs(term);
        setJobs(jobs);
    }

    if (!jobs) return <Loading />;

    return (
        <div className="JobList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            {jobs.map(job => (         
                <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    companyName={job.companyName}
                    salary={job.salary}
                    equity={job.equity}
                />      
            ))}
        </div>
    );
};

export default JobList;
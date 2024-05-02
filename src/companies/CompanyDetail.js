import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import JoblyApi from "../api/api";

import JobCard from "../jobs/JobCard";
import Loading from "../common/Loading";

/** Company Detail Component
 * 
 * Provides a company's name, description, and list of available jobs
 * 
 * route: /companies/:handle
 * 
 * Other components used: JobCard, Loading
 */

const CompanyDetail = () => {
    const { handle } = useParams();
    console.debug("CompanyDetail", "handle=", handle);

    const [company, setCompany] = useState(null);
    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        async function getCompanyAndJobs() {
            const companyData = await JoblyApi.getCompany(handle);
            setCompany(companyData);

            const allJobs = await JoblyApi.getAllJobs();

            const companyJobs = allJobs.filter(job => job.companyHandle === handle);
            setJobs(companyJobs);
        }
        getCompanyAndJobs();
    }, [handle])

    if (!company || !jobs) return <Loading />;

    return (
        <div className="CompanyDetail col-md-8 offset-md-2">
            <div className="heading-text">
                <h4 className="CompanyDetail-title">
                    {company.name}
                </h4>
                <p className="CompanyDetail-text">
                    {company.description}
                </p>
            </div>
            <div className="CompanyDetail-list">
                {jobs.map(job => (
                    <JobCard
                        key={job.id}
                        id={job.id}
                        title={job.title}
                        salary={job.salary}
                        equity={job.equity}
                    />
                ))}
            </div>
        </div>
    );
};

export default CompanyDetail;
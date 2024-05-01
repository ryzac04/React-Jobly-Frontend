import React, { useState, useContext } from "react";

import UserContext from "../auth/UserContext";

import "./JobCard.css";

/** Job Card Component
 * 
 * Card that renders a job's title, company name, salary, and equity
 * 
 * List of cards rendered by JobList
 * 
 * Found in: JobList
 */

const JobCard = ({ id, title, companyName, salary, equity }) => {
    console.debug("JobCard");

    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    React.useEffect(function updateAppliedStatus() {
        console.debug("JobCard useEffect updateAppliedStatus", "id=", id);

        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

    /** Apply for a job */
    async function handleApply(evt) {
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }

    return (
        <div className="JobCard card"> {applied}
            <div className="card-body">
                <h6 className="card-title">
                    {title}
                </h6>
                <p>{companyName} </p>
                {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
                {equity !== undefined && <div><small>Equity: {equity}</small></div>}
                <button
                    className="btn btn-danger fw-bold text-uppercase float-end"
                    onClick={handleApply}
                    disabled={applied}          
                >
                    {applied ? "Applied" : "Apply"}
                </button>
            </div>
        </div>
    );
};

function formatSalary(salary) {
    const digitsRev = [];
    const salaryStr = salary.toString();

    for (let i = salaryStr.length - 1; i >= 0; i--){
        digitsRev.push(salaryStr[i]);
        if (i > 0 && i % 3 === 0) digitsRev.push(",");
    }

    return digitsRev.reverse().join("");
}

export default JobCard;
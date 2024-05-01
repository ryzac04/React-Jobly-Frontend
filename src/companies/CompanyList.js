import { useState, useEffect } from "react";

import JoblyApi from "../api/api";

import CompanyCard from "./CompanyCard";
import SearchForm from "../common/SearchForm";
import Loading from "../common/Loading";


/** Company List Component
 * 
 * Initial render provides list of all companies.
 * 
 * Search form filters companies by search term. 
 * 
 * route: /companies
 * 
 * Other components used: CompanyCard, SearchForm, Loading 
 */

const CompanyList = () => {
    console.debug("CompanyList");

    const [companies, setCompanies] = useState(null);

    useEffect(function getAllCompaniesOnMount() {
        console.debug("CompanyList useEffect getAllCompaniesOnMount");
        search();
    }, []);

    async function search(term) {
        let companies = await JoblyApi.getAllCompanies(term);
        setCompanies(companies);
    }

    if (!companies) return <Loading />;

    return (
        <div className="CompanyList col-md-8 offset-md-2">
            <SearchForm searchFor={search} />
            <div className="CompanyList-list">
                {companies.map(company => (       
                    <CompanyCard
                        key={company.handle}
                        handle={company.handle}
                        name={company.name}
                        description={company.description}
                        logoUrl={company.logoUrl}
                    />        
                ))}
            </div>
        </div>
    );
};

export default CompanyList;
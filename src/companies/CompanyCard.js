import { Link } from "react-router-dom";

import "./CompanyCard.css"

/** Company Card Component
 * 
 * Card that renders a company's name, description, and logo.
 * 
 * List of cards rendered by CompanyList
 * 
 * Found in: CompanyList 
 */

const CompanyCard = ({ handle, name, description, logoUrl }) => {
    console.debug("CompanyCard");

    return (
        <Link style={{textDecoration: 'none'}} to={`/companies/${handle}`}>
            <div className="CompanyCard">
                <div className="card-body">
                    <h6 className="card-title mb-2">
                        {name}
                        {logoUrl && <img
                            src={logoUrl}
                            alt={`${name} logo`}
                            className="float-end ms-5" />}
                    </h6>
                    <p className="card-text mb-2"><small>{description}</small></p>
                </div>
            </div>
        </Link>
    );
};

export default CompanyCard;
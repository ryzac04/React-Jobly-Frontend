import { useState } from "react";

/** Search Form component
 *
 * Appears on CompanyList and JobList to filter to the user's preference. 
 * 
 * Renders the search form and calls `searchFor` function prop that runs in
 * the parent to do the searching/filtering.
 * 
 * Found in: CompanyList, JobList
 */

const SearchForm = ({ searchFor }) => {
    console.debug("SearchForm", "searchFor=", typeof searchFor)

    const [searchTerm, setSearchTerm] = useState("");

    /** Update form fields */
    function handleChange(evt) {
        setSearchTerm(evt.target.value);
    }

    /** Tell parent to filter */
    function handleSubmit(evt) {
        // prevents accidentally searching for only spaces
        evt.preventDefault();
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    return (
        <form className="SearchForm mb-4" onSubmit={handleSubmit}>
            <div className="row justify-content-center justify-content-lg-start gx-0">
                <div className="col-8">
                    <input
                        className="form-control form-control-lg"
                        id="searchTerm"
                        type="text"
                        name="searchTerm"
                        placeholder="Enter search term..."
                        value={searchTerm}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-auto">
                    <button className="btn btn-lg btn-primary">Submit</button>
                </div>
            </div>
        </form>
    );
};

export default SearchForm;
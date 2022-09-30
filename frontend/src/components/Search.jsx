import React from "react";

const Search = (props) => {
    const {searchBy} = props;
    return(
        <>
            <div className="search input-group">
                <span className="input-group-text" id="basic-addon1">🔍</span>
                <input type="text" name="search" className="form-control" required onInput={searchBy}/>
            </div>
        </>
    )
}

export default Search;
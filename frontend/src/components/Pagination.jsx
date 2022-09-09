import React, { useContext } from "react";
import { PaginationContext } from "./Admin";

const Pagination = ({users}) => {
    const {page, setPage} = useContext(PaginationContext);
    const currentPage = page.pageNo;

    const noOfPages = Math.floor(users.length/3) + (users.length%3 !== 0 && 1);
    const pages = [];
    for(let i=0;i<noOfPages;i++){
        pages[i] = i+1;
    }

    const showPage = (e) => {
        setPage({
            pageNo: parseInt(e.target.id),
            start: e.target.id * 3,
            end: (e.target.id * 3) + 2
        })
    }

    const previousPage = () => {
        setPage((preValue) => {
            return{
                pageNo: preValue.pageNo - 1,
                start: (preValue.pageNo - 1) * 3,
                end: ((preValue.pageNo - 1) * 3) + 2
            }
        })
    }

    const nextPage = () => {
        setPage((preValue) => {
            return{
                pageNo: preValue.pageNo + 1,
                start: (preValue.pageNo + 1) * 3,
                end: ((preValue.pageNo + 1) * 3) + 2
            }
        })
    }

    const jumpToFirst = () => {
        setPage({
            pageNo: 0,
            start: 0,
            end: 2
        })
    }

    const jumpToLast = () => {
        setPage({
            pageNo: noOfPages - 1,
            start: (noOfPages - 1) * 3,
            end: ((noOfPages - 1) * 3) + 2
        })
    }
    
    return(
        <>
            {noOfPages > 1 && <div className="pagination">
                <div className="page">
                    {currentPage !== 0 && <p onClick={jumpToFirst}>&#xab;</p>}
                </div>
                <div className="page leftArrow">
                    {currentPage !== 0 && <p onClick={previousPage}>&#8249;</p>}
                </div>
                {pages.map((page,index) => {
                    if(Math.abs(currentPage - index) < 2){
                        return(
                            <div key={index} className="page" id={currentPage === index? "active" : null}>
                                <p id={index} onClick={showPage}>{page}</p>
                            </div>
                        );
                    }
                   
                })}
                <div className="page rightArrow">
                    {currentPage < (noOfPages-1) && <p onClick={nextPage}>&#8250;</p>}
                </div>
                <div className="page">
                    {currentPage < (noOfPages-1) && <p onClick={jumpToLast}>&#xbb;</p>}
                </div>
            </div>}
        </>
    )
}

export default Pagination;
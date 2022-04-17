import React from 'react';

const Pagination = ({totalPages, setPage, page}) => {
    const pagesArray = new Array(totalPages).fill(0);
    const nextPage = () => {
        setPage(page + 1 > totalPages ? totalPages : page + 1)
    }
    const prevPage = () => {
        setPage(page - 1 > 0 ? page - 1 : 1)
    }
    return (
        <div className="container pagination">
            <div className="prev_page" onClick={() => prevPage()}>
                <div className="prev_page_icon"/>
                <p>Предыдущая</p>
            </div>
            <div className="page_wrapper">
                {pagesArray.map((item, id) =>
                    <div
                        key={id}
                        className={page === id + 1 ? 'page page_cur' : 'page'}
                        onClick={() => setPage(id + 1)}
                    >
                        {id + 1}
                    </div>
                )}
            </div>
            <div className="next_page" onClick={() => nextPage()}>
                <p>Следующая</p>
                <div className="next_page_icon"/>
            </div>
        </div>

    );
};

export default Pagination;
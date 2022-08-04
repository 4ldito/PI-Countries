import style from './Pagination.module.css';

const Pagination = ({ countries, setLimit, pageNumber, setPageNumber }) => {
    const totalPages = ((countries.length + 1) / 10);

    const handleOnClickPage = (e) => {
        e.preventDefault();
        const page = Number(e.target.innerText);
        if (page === 1) setLimit({ min: 0, max: 8 });
        else setLimit({
            min: ((page - 1) * 10) - 1,
            max: ((page - 1) * 10) + 8
        });
        setPageNumber(page);
    }

    const buttonsPage = [];
    for (let i = 0; i < totalPages; i++) {
        buttonsPage.push(i + 1);
    }

    return (
        <div className={style.containerPages}>
            <div className={style.pages}>
                {buttonsPage.map((page) => <button
                    className={(pageNumber === page) ? `${style.active} ${style.btnPage}` : `${style.btnPage}`}
                    onClick={handleOnClickPage}
                    key={page}>{page}</button>
                )}
            </div>
        </div>
    )
}

export default Pagination;
const Pagination = ({ pagination, page, setPage }) => {
    const handlePage = (p) => {
        if (p === '&laquo; Previous' || p === 'Next &raquo;') {
            setPage(prev => p === '&laquo; Previous' ? prev - 1 : prev + 1);
            return;
        }
        setPage(p);
    }

    return (
        pagination?.links.length > 0 && (
            <div className="flex justify-center items-center gap-1 mt-12">
                {pagination?.links.map((l, i) => (
                    <button
                        key={i}
                        className={`py-1 rounded-full w-8 h-8 text-center ${l.label === page.toString()
                                // Active
                                ? 'bg-cyan-700 text-white'
                                // Not Active
                                : l.url
                                // Clickable
                                ? 'cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                                // Not Clickable
                                : 'cursor-not-allowed text-gray-400'
                            }`}
                        onClick={() => handlePage(l.label)}
                        disabled={!l.url}
                    >
                        {l.label === '&laquo; Previous' ? '<' : l.label === 'Next &raquo;' ? '>' : l.label}
                    </button>
                ))}
            </div>
        )
    )
}

export default Pagination
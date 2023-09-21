import { disabled, showLabel } from "../utils/paginationLogics";

const Pagination = ({ pagination, page, setPage }) => {
    const handlePage = (p) => {
        if (p === '&laquo; Previous' || p === 'Next &raquo;') {
            setPage(prev => p === '&laquo; Previous' ? prev - 1 : prev + 1);
            return;
        }
        setPage(parseInt(p));
    }

    return (
        pagination?.links.length > 3 && (
            <div className="flex justify-center items-center gap-1 mt-3 mb-2">
                {pagination?.links.map((l, i) => (
                    <button
                        key={i}
                        className={`py-1 rounded-full w-8 h-8 text-center ${l.label === page.toString()
                                // Active
                                ? 'bg-cyan-700 text-white'
                                // Not Active
                                : disabled(pagination, page, l)
                                // Not Clickable
                                ? 'cursor-not-allowed text-gray-400'
                                // Clickable
                                : 'cursor-pointer dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                        onClick={() => handlePage(l.label)}
                        disabled={disabled(pagination, page, l)}
                    >
                        {showLabel(l)}
                    </button>
                ))}
            </div>
        )
    )
}

export default Pagination
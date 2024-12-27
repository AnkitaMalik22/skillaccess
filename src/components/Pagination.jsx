export default function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <div className="flex justify-center items-center w-full py-4">
            <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => {
                    const pageNumber = i + 1
                    const isCurrent = currentPage === pageNumber

                    // Always show the first and last pages
                    if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        pageNumber === currentPage || // Show the current page
                        pageNumber === currentPage - 1 || // Previous page
                        pageNumber === currentPage + 1 // Next page
                    ) {
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => onPageChange(pageNumber)}
                                className={`
                    min-w-[40px] h-10 px-4 
                    rounded-md border border-input 
                    text-sm font-medium
                    transition-colors
                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                    disabled:pointer-events-none disabled:opacity-50
                    ${isCurrent
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90 border-accent"
                                        : "bg-background text-foreground hover:bg-accent hover:text-white"
                                    }
                  `}
                                aria-current={isCurrent ? "page" : undefined}
                            >
                                {pageNumber}
                            </button>
                        )
                    }

                    // Add ellipses
                    if (
                        (pageNumber === currentPage - 2 && currentPage > 4) || // Ellipsis before current range
                        (pageNumber === currentPage + 2 && currentPage < totalPages - 3) // Ellipsis after current range
                    ) {
                        return (
                            <button
                                key={pageNumber}
                                className="min-w-[40px] h-10 px-4 
                    rounded-md border border-input 
                    text-sm font-medium 
                    bg-background text-muted-foreground
                    pointer-events-none opacity-50"
                                disabled
                            >
                                &#8230;
                            </button>
                        )
                    }

                    return null // Hide irrelevant pages
                })}
            </div>
        </div>
    )
}
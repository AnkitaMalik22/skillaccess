export default function Pagination({ currentPage, totalPages, onPageChange }) {
  console.log("Current Page:", currentPage, "Total Pages:", totalPages);

  return (
    <div className="flex justify-center items-center w-full py-4">
      <div className="flex gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="min-w-[40px] h-10 px-4 rounded-md border border-input text-sm font-medium bg-background text-foreground hover:bg-accent"
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1;
          const isCurrent = currentPage === pageNumber;

          if (
            pageNumber === 1 ||
            pageNumber === totalPages ||
            pageNumber === currentPage ||
            pageNumber === currentPage - 1 ||
            pageNumber === currentPage + 1
          ) {
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`
                  min-w-[40px] h-10 px-4 rounded-md border border-input text-sm font-medium
                  transition-colors
                  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
                  ${
                    isCurrent
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-foreground hover:bg-accent hover:text-white"
                  }
                `}
                aria-current={isCurrent ? "page" : undefined}
              >
                {pageNumber}
              </button>
            );
          }

          if (
            (pageNumber === currentPage - 2 && currentPage > 4) ||
            (pageNumber === currentPage + 2 && currentPage < totalPages - 3)
          ) {
            return (
              <button
                key={pageNumber}
                className="min-w-[40px] h-10 px-4 rounded-md border border-input text-sm font-medium bg-background text-muted-foreground pointer-events-none opacity-50"
                disabled
              >
                &#8230;
              </button>
            );
          }

          return null;
        })}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="min-w-[40px] h-10 px-4 rounded-md border border-input text-sm font-medium bg-background text-foreground hover:bg-accent"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

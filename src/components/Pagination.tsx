import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  // Holds page numbers and ellipsis
  const pages: (number | string)[] = [];

  const maxPagesToShow = 5;

  // Calculates visible page range
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Adjust start if we're near the end
  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  // Adds first page and leading ellipsis if needed
  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) pages.push("..."); // Avoid duplicate dots
  }

  // Add main page range
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Adds trailing ellipsis and last page if needed
  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      {/* Page indicator */}
      <div className="text-sm text-gray-600">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Jump to first page */}
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>
          <ChevronsLeft />
        </button>

        {/* Previous page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </button>

        {/* Page numbers */}
        <div className="flex gap-2">
          {pages.map((page, index) =>
            page === "..." ? (
              <span key={index}>...</span> // index is fine here since it's static
            ) : (
              <button key={page} onClick={() => onPageChange(page as number)}>
                {page}
              </button>
            ),
          )}
        </div>

        {/* Next page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight />
        </button>

        {/* Jump to last page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;

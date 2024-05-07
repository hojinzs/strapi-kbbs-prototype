'use client'

export interface PaginateProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Paginate({
  currentPage,
  totalPages,
  onPageChange
}: PaginateProps) {
  return (
    <div className="flex justify-center mt-4">
      <ul className="flex">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 bg-gray-200 rounded-l-lg"
          >
            이전
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`px-2 py-1 ${
                currentPage === page ? "bg-gray-200" : "bg-white"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 bg-gray-200 rounded-r-lg"
          >
            다음
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Paginate

'use client'

import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

function PaginatedList({ items, itemsPerPage = 12 }) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  const start = (currentPage - 1) * itemsPerPage
  const paginatedItems = items.slice(start, start + itemsPerPage)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"> 
        {paginatedItems}
      </div>

      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          className={`p-2 rounded-full ${hasPrevPage ? 'text-black hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
          disabled={!hasPrevPage}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>

        <div className="text-sm font-medium">
          {currentPage} / {totalPages}
        </div>

        <button
          className={`p-2 rounded-full ${hasNextPage ? 'text-black hover:bg-gray-100' : 'text-gray-300 cursor-not-allowed'}`}
          disabled={!hasNextPage}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}

export default PaginatedList
interface PaginationProps {
  currentPage: number
  totalNumOfData: number
  recordsPerPage: number
  onPageChange: (page: number) => void
}

export const ClientSidePagination: React.FC<PaginationProps> = ({ currentPage, totalNumOfData, recordsPerPage, onPageChange }) => {
  const nPages = Math.ceil(totalNumOfData / recordsPerPage)
  const pageNumbers = Array.from({length: nPages}, (_, i) => i + 1)
  const onPrev = () => {
    if (currentPage > 1) {
      currentPage--
      onPageChange(currentPage)
    }
  }
  const onNext = () => {
    if (currentPage < nPages) {
      currentPage++
      onPageChange(currentPage)
    }
  }
  
  return (
    <div style={{ margin: '5px' }}>
      <button onClick={onPrev} disabled={currentPage===1} style={{ margin: '0 5px' }}>Previous</button>
      {pageNumbers.map(pgNumber => (
        <span key={pgNumber} style={{ margin: '0 5px' }}>
          <a onClick={() => onPageChange(pgNumber)}  
            href='#'>
            {pgNumber}
          </a>
        </span>
      ))}
      <button onClick={onNext} disabled={currentPage===nPages} style={{ margin: '0 5px' }}>Next</button>
    </div>
  )
}
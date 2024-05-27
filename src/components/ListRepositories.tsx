import React, { useState } from 'react'

import { SearchForm } from './SearchForm'
import { Table } from './Table'
import { ClientSidePagination } from './ClientSidePagination'
import { getReposByUserOrOrg } from '../utils'


export const ListRepositories: React.FC = () => {
  const recordsPerPage = 10
  const [repos, setRepos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const handleSearch = (name: string) => {
    setCurrentPage(1)
    getReposByUserOrOrg(name).then(response => {
      setRepos(response)
    })
  }
  const data = repos.slice(recordsPerPage * (currentPage - 1), recordsPerPage * currentPage)
  
  return (
    <div className="App">
      <SearchForm onSearch={handleSearch} page={currentPage} per_page={recordsPerPage}/>
      <Table repos={data} />
      <ClientSidePagination
        currentPage={currentPage}
        totalNumOfData={repos.length}
        recordsPerPage={recordsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};



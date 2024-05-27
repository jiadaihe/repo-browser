// This file is experimental, I didn't make it fully correct, so commented out.

interface PaginationProps {
  onPrev: () => void
  onNext: () => void
  pageRemaining: boolean
  pagesPrev: boolean
}

const Pagination: React.FC<PaginationProps> = ({ onPrev, onNext, pageRemaining, pagesPrev }) => {  
  return (
    <nav>
      <ul>
        <button onClick={onPrev} disabled={!pagesPrev}>Previous</button>
        <button onClick={onNext} disabled={!pageRemaining}>Next</button>
      </ul>
    </nav>
  )
}

// const getReposByUser = async (username: string, per_page: number, page: number): Promise<{data: any, pagesRemaining: boolean, pagesPrev: boolean}> => {
//   const url = `${apiUrl}/users/${username}/repos?per_page=${per_page}&page=${page}`
//   console.log(url)
//   const options = {
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   }
//   const res = await fetch(url, options)
//   const linkHeader = res.headers.get('link')
//   const pagesRemaining = linkHeader !== null && linkHeader.includes(`rel=\"next\"`)
//   const pagesPrev = linkHeader !== null && linkHeader.includes(`rel=\"prev\"`)
//   console.log({linkHeader: linkHeader})

//   if (!res.ok) {
//       console.error(`Status ${res.status}. Failed to get repos for user ${username}`)
//       return {
//         data: null,
//         pagesRemaining: false,
//         pagesPrev: false
//       }
//   }
//   return {
//     data: await res.json(),
//     pagesRemaining: pagesRemaining,
//     pagesPrev: pagesPrev
//   }
// }

// export const ListRepositories: React.FC = () => {
  
//   const recordsPerPage = 10
//   const [repos, setRepos] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [username, setUsername] = useState('')
//   const [pagesRemaining, setPageRemaining] = useState(false)
//   const [pagesPrev, setPagesPrev] = useState(false)
//   const handleSearch = (username: string, per_page: number, page: number) => {
//     setCurrentPage(1)
//     getReposByUser(username, per_page, page).then(response => {
//       console.log({insideGet: page})
//       setRepos(response.data)
//       setPageRemaining(response.pagesRemaining)
//       setPagesPrev(response.pagesPrev)
//     })
//   }
//   const onPrev = () => {
//     if (pagesPrev) {
//       setCurrentPage(currentPage - 1)
//       getReposByUser(username, recordsPerPage, currentPage).then(response => {
//         console.log({insidePrev: currentPage})
//         setRepos(response.data)
//         setPageRemaining(response.pagesRemaining)
//       setPagesPrev(response.pagesPrev)
//     })
//     }
//   }
//   const onNext = () => {
//     if (pagesRemaining) {
//       setCurrentPage(currentPage + 1)
//       getReposByUser(username, recordsPerPage, currentPage).then(response => {
//         console.log({insideNext: currentPage})
//         setRepos(response.data)
//         setPageRemaining(response.pagesRemaining)
//         setPagesPrev(response.pagesPrev)
//       })
//     }
//   }
//   // const data = repos.slice(recordsPerPage * (currentPage - 1), recordsPerPage * currentPage)
//   console.log("ListRepositories")
//   console.log({currentPage: currentPage})

//   // useEffect(()=> {
//   //   getReposByUser(username, 1).then(d => {
//   //     console.log(d.length)
//   //       // setRepos(d)
//   //     })
//   //   console.log("fuckkkkkkkk")
//   // }, [username]) 
  
//   return (
//     <div className="App">
//       <SearchForm onSearch={handleSearch} page={currentPage} per_page={recordsPerPage}/>
//       <RepoTable repos={repos} />
//       <Pagination
//         onNext={onNext}
//         onPrev={onPrev}
//         pageRemaining={pagesRemaining}
//         pagesPrev={pagesPrev}
//       />
//     </div>
//   );
// };



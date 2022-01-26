import React from "react"
import axios from "axios"
import { useQuery, useQueryClient } from "react-query"
//
// Components
//
import QuestionListItem from "./QuestionListItem"

const pageRows = 8
const sqlClient = "Quiz/QuestionList"
const { URL_QUESTIONS } = require("./constants.js")
let hasMore = true

//...................................................................................
//.  Main function
//...................................................................................
export default function TestRoute2() {
  return <Example />
}
//...................................................................................
//.  Get Database rows
//...................................................................................
async function fetchList(page = 1) {
  //
  //  SQL database
  //
  let Offset = (page - 1) * pageRows
  const sqlString = `* from questions order by qid OFFSET ${Offset} ROWS FETCH NEXT ${pageRows} ROWS ONLY`
  //
  //  Return promise
  //
  const data = await axios.post(URL_QUESTIONS, {
    sqlClient: sqlClient,
    sqlAction: "SELECTSQL",
    sqlString: sqlString,
  })
  //
  //
  //
  return data
}
//...................................................................................
function Example() {
  const queryClient = useQueryClient()
  const [page, setPage] = React.useState(1)
  //
  // Get data
  const { status, data, error, isFetching, isPreviousData } = useQuery(
    ["TestRoute2", page],
    () => fetchList(page),
    { keepPreviousData: true, staleTime: 5000 }
  )
  //
  // Prefetch the next page!
  //
  React.useEffect(() => {
    if (hasMore) {
      queryClient.prefetchQuery(["TestRoute2", page + 1], () => {
        fetchList(page + 1)
      })
    }
  }, [data, page, queryClient])

  return (
    <div>
      {status === "loading" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>Error: {error.message}</div>
      ) : (
        <table className='table-fixed content-table'>
          <thead className='table-header-group'>
            <tr className='table-row'>
              <th className='table-cell'>ID</th>
              <th className='table-cell'>Owner</th>
              <th className='table-cell'>Key</th>
              <th className='table-cell'>Title</th>
              <th className='table-cell'>Detail</th>
              <th className='table-cell'>Hyperlink1</th>
              <th className='table-cell'>Hyperlink2</th>
              <th className='table-cell'>Answer</th>
              <th className='table-cell'>Bad1</th>
              <th className='table-cell'>Bad2</th>
              <th className='table-cell'>Bad3</th>
              <th className='table-cell'>Group1</th>
              <th className='table-cell'>Group2</th>
            </tr>
          </thead>

          <tbody className='table-row-group'>
            {data?.data.map(row => (
              <QuestionListItem key={row.qid} question={row} />
            ))}
          </tbody>
        </table>
      )}
      <div>Current Page: {page}</div>
      {/* //.............................................................................*/}
      <button
        onClick={() => setPage(old => Math.max(old - 1, 1))}
        disabled={page === 1}
      >
        Previous Page
      </button>{" "}
      {/* //.............................................................................*/}
      <button
        onClick={() => {
          setPage(old => (hasMore ? old + 1 : old))
        }}
        disabled={isPreviousData || !hasMore}
      >
        Next Page
      </button>
      {/* //.............................................................................*/}
      {
        // Since the last page's data potentially sticks around between page requests,
        // we can use `isFetching` to show a background loading
        // indicator since our `status === 'loading'` state won't be triggered
        isFetching ? <span> Loading...</span> : null
      }{" "}
    </div>
  )
}

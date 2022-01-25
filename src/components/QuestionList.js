import { useState, useEffect } from "react"
import { useQuery } from "react-query"
import apiRequest from "./apiRequest"
import axios from "axios"
//
// Components
//
import QuestionListItem from "./QuestionListItem"
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const sqlClient = "Quiz/QuestionList"
const { URL_QUESTIONS } = require("./constants.js")
const pageRows = 8
let g_moreData = true

//...................................................................................
//.  Get Database rows
//...................................................................................
const fetchData = pageNumber => {
  //
  //  SQL database
  //
  let Offset = (pageNumber - 1) * pageRows
  const sqlString = `* from questions order by qid OFFSET ${Offset} ROWS FETCH NEXT ${pageRows} ROWS ONLY`
  //
  //  Return promise
  //
  const datafetched = axios.post(URL_QUESTIONS, {
    sqlClient: sqlClient,
    sqlAction: "SELECTSQL",
    sqlString: sqlString,
  })

  return datafetched
}
//...................................................................................
//.  Get Next 1 row
//...................................................................................
const fetchData1more = async pageNumber => {
  let moredata
  try {
    //
    //  Setup actions
    //
    let Offset = pageNumber * pageRows
    const method = "post"
    const sqlString = `* from questions order by qid OFFSET ${Offset} ROWS FETCH NEXT 1 ROWS ONLY`
    const body = {
      sqlClient: sqlClient,
      sqlAction: "SELECTSQL",
      sqlString: sqlString,
    }
    //
    //  SQL database
    //
    const datafetched = await apiRequest(method, URL_QUESTIONS, body)
    //
    //  More data ?
    //
    moredata = datafetched ? true : false
    //
    //  More data - FALSE
    //
  } catch (err) {
    moredata = false
  } finally {
    g_moreData = moredata
    return moredata
  }
}

//...................................................................................
//.  Function
//...................................................................................
function QuestionList() {
  //
  // State
  //
  const [pageNumber, setPageNumber] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  //
  //  Get the data
  //
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["questions", pageNumber],
    () => fetchData(pageNumber),
    {
      keepPreviousData: true,
    }
  )
  //
  //  Get 1 more
  //
  useEffect(() => {
    fetchData1more(pageNumber)
  }, [pageNumber])

  //...................................................................................
  //.  Render the form
  //...................................................................................
  //
  //  Waiting for data
  //
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }
  //
  //  Form to be rendered
  //
  return (
    <div>
      <h2>Question List</h2>
      {isFetching && "Loading"}
      <>
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
        <div>
          {/*--------------------------------------------------------------*/}
          <button
            onClick={() => {
              setPageNumber(page => page - 1)
              setHasMore(true)
              g_moreData = true
            }}
            disabled={pageNumber === 1}
          >
            Prev Page
          </button>
          {/*--------------------------------------------------------------*/}
          <button
            onClick={() => {
              if (g_moreData && hasMore) {
                setPageNumber(page => page + 1)
              }
            }}
            disabled={!g_moreData || !hasMore}
          >
            Next Page
          </button>
          {/*--------------------------------------------------------------*/}
        </div>
      </>
    </div>
  )
}

export default QuestionList

import { useState, useEffect } from "react"
import { useQuery } from "react-query"
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
const log = true
const staleTime = 300000
//
// Global Variables
//
let g_lastPage = 999
//...................................................................................
//.  Get Database rows
//...................................................................................
const fetchData = pageNumber => {
  //
  //  SQL database
  //
  let Offset = (pageNumber - 1) * pageRows
  const method = "post"
  const sqlString = `* from questions order by qid OFFSET ${Offset} ROWS FETCH NEXT ${
    pageRows + 1
  } ROWS ONLY`
  const body = {
    sqlClient: sqlClient,
    sqlAction: "SELECTSQL",
    sqlString: sqlString,
  }
  //
  //  Return promise
  //
  return axios({
    method: method,
    url: URL_QUESTIONS,
    data: body,
  })
}

//...................................................................................
//.  Function
//...................................................................................
function QuestionList() {
  //
  // State
  //
  const [pageNumber, setPageNumber] = useState(1)
  const [dataRows, setDataRows] = useState([])
  //
  //  Get the data
  //
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ["questions", pageNumber],
    () => fetchData(pageNumber),
    {
      keepPreviousData: true,
      staleTime: staleTime,
    }
  )
  //
  //  Data returned
  //
  useEffect(() => {
    if (data) {
      //
      //  Calculate data to display
      //
      let datalength
      data.data.length > pageRows
        ? (datalength = pageRows)
        : (datalength = data.data.length)
      const displayData = data.data.slice(0, datalength)
      setDataRows(displayData)
      //
      //  Data returned not a pageRows + 1, it is the last page
      //
      if (g_lastPage === 999) {
        if (data.data.length <= pageRows) {
          g_lastPage = pageNumber
          if (log) {
            console.log(`g_lastPage(${g_lastPage})`)
          }
        }
      }
    }
  }, [data])

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
  //  Page message
  //
  let message
  g_lastPage === 999
    ? (message = `Page ${pageNumber}`)
    : (message = `Page ${pageNumber}/${g_lastPage}`)
  //
  //  Form to be rendered
  //
  return (
    <div>
      <h2>Question List</h2>
      {isFetching && "Loading"}
      <>
        {/*--------------------------------------------------------------*/}
        <table className='table-fixed content-table MainPanel'>
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
            {dataRows.map(row => (
              <QuestionListItem key={row.qid} question={row} />
            ))}
          </tbody>
        </table>
        <div>
          {/*--------------------------------------------------------------*/}
          {<p>{message}</p>}

          {/*-------------------------------------------------------------*/}
          <button
            onClick={() => {
              setPageNumber(page => page - 1)
            }}
            disabled={pageNumber === 1}
          >
            Prev Page
          </button>
          {/*--------------------------------------------------------------*/}
          <button
            onClick={() => {
              if (pageNumber < g_lastPage) {
                setPageNumber(page => page + 1)
              }
            }}
            disabled={pageNumber === g_lastPage}
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

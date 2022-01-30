import { useState, useEffect } from "react"
import MaterialTable from "material-table"
import { Checkbox } from "@material-ui/core"
import { MtableCols } from "./MtableCols"
import apiRequest from "./apiRequest"

//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const sqlClient = "Quiz/MaterialUI"
const { URL_QUESTIONS } = require("./constants.js")
const maxRows = 200
const log = true

function Mtable() {
  //...................................................................................
  //.  Define the State variables
  //...................................................................................
  const [filteredData, setFilteredData] = useState([])
  const [filter, setFilter] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  //--------------------------------------------------------------------
  //.  Initial load of data
  //--------------------------------------------------------------------
  useEffect(() => {
    const fetchItems = async () => {
      try {
        //
        //  Setup actions
        //
        const method = "post"
        const body = {
          sqlClient: sqlClient,
          sqlAction: "SELECTSQL",
          sqlString: `* from questions order by qid OFFSET 0 ROWS FETCH NEXT ${maxRows} ROWS ONLY`,
        }
        //
        //  SQL database
        //
        const resultData = await apiRequest(method, URL_QUESTIONS, body)
        //
        //  Process results
        //
        if (!resultData) throw Error("Did not receive expected data")
        setFilteredData(resultData)
        setFetchError(null)
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    //
    //  Initial fetch of data
    //
    fetchItems()
  }, [])
  //--------------------------------------------------------------------
  //.  Update database
  //--------------------------------------------------------------------
  const DatabaseUpdate = async row => {
    try {
      //
      //  Deconstruct
      //
      const {
        qid,
        qowner,
        qkey,
        qtitle,
        qdetail,
        qhyperlink1,
        qhyperlink2,
        qanswer_correct,
        qanswer_bad1,
        qanswer_bad2,
        qanswer_bad3,
        qgroup1,
        qgroup2,
      } = row
      if (log) {
        console.log(`Row data, id(${qid})  correct answer(${qanswer_correct})`)
      }
      //
      //  Setup actions
      //
      if (log) {
        console.log(`typeof ${typeof row} row(${row})`)
      }
      const method = "post"
      const body = {
        sqlClient: sqlClient,
        sqlAction: "UPDATE",
        sqlTable: "questions",
        sqlWhere: `qid = ${qid}`,
        sqlRow: {
          qowner: qowner,
          qkey: qkey,
          qtitle: qtitle,
          qdetail: qdetail,
          qhyperlink1: qhyperlink1,
          qhyperlink2: qhyperlink2,
          qanswer_correct: qanswer_correct,
          qanswer_bad1: qanswer_bad1,
          qanswer_bad2: qanswer_bad2,
          qanswer_bad3: qanswer_bad3,
          qgroup1: qgroup1,
          qgroup2: qgroup2,
        },
      }

      if (log) {
        console.log(`update body ${body} `)
      }
      //
      //  SQL database
      //
      const resultData = await apiRequest(method, URL_QUESTIONS, body)
      //
      //  Update error
      //
      if (!resultData) throw Error("Database not updated")
      //
      //  Process results
      //
      if (log) {
        console.log(`Database updated, id(${qid})`)
      }
      setFilteredData(resultData)
      setFetchError(null)
    } catch (err) {
      setFetchError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  //...................................................................................
  //.  Filter flag
  //...................................................................................
  const handleChange = () => {
    setFilter(!filter)
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <div className='App'>
      {/* //                                                                              */}
      {/* //  Loading or Fetching error                                                   */}
      {/* //                                                                              */}
      {isLoading && <p>Loading ...</p>}
      {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}

      {/* //                                                                              */}
      {/* //  Data Received                                                   */}
      {/* //                                                                              */}
      {!fetchError && !isLoading && (
        <MaterialTable
          title='Quiz Data'
          data={filteredData}
          columns={MtableCols}
          editable={{
            onRowAdd: newRow =>
              new Promise((resolve, reject) => {
                const updatedRows = [
                  ...filteredData,
                  { qid: Math.floor(Math.random() * 1000), ...newRow },
                ]
                setTimeout(() => {
                  setFilteredData(updatedRows)
                  resolve()
                }, 1000)
              }),
            onRowDelete: selectedRow =>
              new Promise((resolve, reject) => {
                const index = selectedRow.tableData.qid
                const updatedRows = [...filteredData]
                updatedRows.splice(index, 1)
                const qid = updatedRows[index].qid
                if (log) {
                  console.log(`Deleted row id(${qid})`)
                }
                setTimeout(() => {
                  setFilteredData(updatedRows)
                  resolve()
                }, 1000)
                // DatabaseDelete(updatedRow)
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                const index = oldRow.tableData.qid
                const updatedRows = [...filteredData]
                updatedRows[index] = updatedRow
                DatabaseUpdate(updatedRow)
                setTimeout(() => {
                  setFilteredData(updatedRows)
                  resolve()
                }, 1000)
              }),
            onBulkUpdate: selectedRows =>
              new Promise((resolve, reject) => {
                const rows = Object.values(selectedRows)
                const updatedRows = [...filteredData]
                let index
                rows.forEach(row => {
                  index = row.oldData.tableData.qid
                  updatedRows[index] = row.newData
                  DatabaseUpdate(row.newData)
                })
                setTimeout(() => {
                  setFilteredData(updatedRows)
                  resolve()
                }, 2000)
              }),
          }}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
            columnsButton: true,
            filtering: filter,
          }}
          actions={[
            {
              icon: () => (
                <Checkbox
                  checked={filter}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              ),
              tooltip: "Hide/Show Filter option",
              isFreeAction: true,
            },
          ]}
        />
      )}
    </div>
  )
}

export default Mtable

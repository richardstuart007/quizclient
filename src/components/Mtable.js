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
                setTimeout(() => {
                  setFilteredData(updatedRows)
                  resolve()
                }, 1000)
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                const index = oldRow.tableData.qid
                const updatedRows = [...filteredData]
                updatedRows[index] = updatedRow
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

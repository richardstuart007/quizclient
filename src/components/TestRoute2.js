import React, { useState } from "react"
import { usePaginatedQuery } from "react-query"
import TestRoute2Item from "./TestRoute2Item"

const fetchList = async (key, pageNumber) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${pageNumber}`)
  return res.json()
}

const TestRoute2 = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ["Qry", pageNumber],
    fetchList
  )

  return (
    <div>
      <h2>Paginated Query Rows</h2>

      {status === "loading" && <div>Loading data</div>}

      {status === "error" && <div>Error fetching data</div>}

      {status === "success" && (
        <>
          <span> Page {pageNumber} </span>

          <button
            onClick={() => setPageNumber(old => Math.max(old - 1, 1))}
            className={pageNumber === 1 ? "hide" : "show"}
          >
            Previous page
          </button>

          <button
            onClick={() =>
              setPageNumber(old =>
                !latestData || !latestData.next ? old : old + 1
              )
            }
            className={!latestData || !latestData.next ? "hide" : "show"}
          >
            Next page
          </button>

          <div>
            {resolvedData.results.map(testRoute2Item => (
              <TestRoute2Item key={testRoute2Item.name} row={testRoute2Item} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default TestRoute2

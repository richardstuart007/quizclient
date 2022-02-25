//
//  Libraries
//
import { useState, useEffect } from 'react'
import { valtioStore } from './ValtioStore'
import { useSnapshot } from 'valtio'
//
//  Sub Components
//
import QuizPanel from './QuizPanel'
import apiRequest from '../apiRequest'
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const sqlClient = 'Quiz/Quiz'
const { URL_QUESTIONS } = require('../constants.js')
const { SQL_TABLE } = require('../constants.js')
const { SQL_MAXROWS } = require('../constants.js')
//
//  Debug logging
//
const log1 = false
const log2 = false
const log3 = true
//
//  Global fields (g_)
//
let g_row = 0
let g_total = 0
let g_quizNum = 0
let g_firstTime = true
let g_history = []
//===================================================================================
//=  This Component
//===================================================================================
function Quiz() {
  //
  //  Define the State variables
  //
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quizData, setQuizData] = useState([])
  const [quizRow, setQuizRow] = useState(null)
  const [countPass, setCountPass] = useState(0)
  //
  //  Define the Store
  //
  const valtioSnap = useSnapshot(valtioStore)
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //--------------------------------------------------------------------
  //.  fetch data
  //--------------------------------------------------------------------
  const fetchItems = async () => {
    try {
      //
      //  Setup actions
      //
      const method = 'post'
      const body = {
        sqlClient: sqlClient,
        sqlAction: 'SELECTSQL',
        sqlString: `* from ${SQL_TABLE} order by qid OFFSET 0 ROWS FETCH NEXT ${SQL_MAXROWS} ROWS ONLY`
      }
      //
      //  SQL database
      //
      const resultData = await apiRequest(method, URL_QUESTIONS, body)
      //
      //  No data returned
      //
      if (!resultData) {
        setForm_message('Did not receive expected data')
        throw Error('Did not receive expected data')
      }
      //
      //  Process results
      //
      setQuizData(resultData)
      setFetchError(null)
    } catch (err) {
      setFetchError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  //...................................................................................
  //.  First time data received
  //...................................................................................
  const firstLoad = () => {
    if (log3) console.log('g_firstTime', g_firstTime)
    g_firstTime = false
    //
    //  Number of questions
    //
    g_quizNum = quizData.length
    //
    // update Store
    //
    valtioStore.v_quizData = quizData
    //
    //  Check/wait for updates to occur
    //
    let count = 0
    const interval1 = setInterval(function () {
      count += 1
      if (valtioSnap.v_quizData[0]) {
        if (log3) {
          console.log('Interval wait store', count)
          console.log('v_quizData', valtioSnap.v_quizData[0])
        }
        clearInterval(interval1)
      }
    }, 1)
    //
    // Update State
    //
    setQuizRow(quizData[0])
    //
    //  Check/wait for updates to occur
    //
    count = 0
    const interval2 = setInterval(function () {
      count += 1
      if (quizRow) {
        if (log3) {
          console.log('Interval wait quizRow', count)
          console.log('quizRow', quizRow)
        }
        clearInterval(interval2)
      }
    }, 1)
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = id => {
    //
    //  Check form
    //
    if (log2) console.log('Form data', id)
    //
    //  Update counts
    //
    if (id === 1) {
      setForm_message('Well done, previous answer correct')
      setCountPass(countPass + 1)
    } else {
      setForm_message('')
    }
    //
    //   Write History
    //
    g_history[g_row] = id
    valtioStore.v_history[g_row] = id
    g_total += 1
    //
    //  End of data
    //
    if (g_row + 1 >= g_quizNum) {
      if (log3) console.log('v_history', valtioSnap.v_history)
      alert('end of data')
      return
    }
    //
    //  Next row
    //
    g_row += 1
    setQuizRow(quizData[g_row])
  }
  //...................................................................................
  //. Answer Selected
  //...................................................................................
  const handleSelect = id => {
    if (log2) console.log(`ID selected ${id}`)
    onSubmitForm(id)
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Initial fetch of data
  //
  useEffect(() => {
    g_firstTime = true
    fetchItems()
  }, [])
  //
  //  Populate data message if no data
  //
  let dataStatus
  isLoading
    ? (dataStatus = 'Loading ...')
    : !quizData
    ? (dataStatus = 'Quiz question empty ...')
    : fetchError
    ? (dataStatus = `Error: ${fetchError}`)
    : (dataStatus = null)
  //
  //  Status error return
  //
  if (dataStatus) {
    if (log2) console.log('dataStatus ', dataStatus)
    return <p style={{ color: 'red' }}>{dataStatus}</p>
  }
  //
  //  Load the first question
  //
  if (g_firstTime) firstLoad()
  //
  //  Title
  //
  let title = `Quiz: ${g_quizNum} questions `
  if (g_total > 0) {
    const passPercentage = Math.ceil((100 * countPass) / g_total)
    title += `:   running score ${countPass}/${g_total} = ${passPercentage}%`
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <main className=''>
        {/*.................................................................................................*/}
        {/*  Form Title */}
        {/*.................................................................................................*/}
        <legend className='py-2'>
          <h1 className='text-3xl '>{title} </h1>
        </legend>

        {/*.................................................................................................*/}
        {/*  Quiz panel */}
        {/*.................................................................................................*/}
        <QuizPanel row={quizRow} handleSelect={handleSelect} />
        {/*.................................................................................................*/}
        {/*  Message */}
        {/*.................................................................................................*/}
        <div className=''>
          <label className='message' htmlFor='text'>
            {form_message}
          </label>
        </div>
      </main>
    </>
  )
}

export default Quiz

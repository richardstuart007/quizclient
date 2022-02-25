//
//  Libraries
//
import { useState, useEffect } from 'react'
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
const log1 = true
const log2 = true
//
//  Global fields (g_)
//
let g_row = 0
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
  const [countTotal, setCountTotal] = useState(0)
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
      //  Process results
      //
      if (!resultData) {
        setForm_message('Did not receive expected data')
        throw Error('Did not receive expected data')
      }
      setQuizData(resultData)
      setFetchError(null)
    } catch (err) {
      setFetchError(err.message)
    } finally {
      setIsLoading(false)
    }
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
    setCountTotal(countTotal + 1)
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
    //
    //  Next row
    //
    if (g_row + 1 < g_quizNum) {
      g_row = g_row + 1
      setQuizRow(quizData[g_row])
    }
    //
    //  End of data
    //
    else {
      alert('end of data')
    }
  }
  //...................................................................................
  //. Answer Selected
  //...................................................................................
  const handleSelect = id => {
    console.log(`ID selected ${id}`)
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
  if (log1) console.log('g_firstTime', g_firstTime)
  if (g_firstTime) {
    g_firstTime = false
    g_quizNum = quizData.length
    setQuizRow(quizData[0])
    if (log1) console.log('setQuizRow')
  }
  //
  //  Populate data message if no data yet
  //
  if (!quizRow) {
    dataStatus = 'Loading first time await state update ...'
    if (log2) console.log('dataStatus ', dataStatus)
    return <p style={{ color: 'red' }}>{dataStatus}</p>
  }
  //
  //  Title
  //
  let title = `Quiz: ${g_quizNum} questions `
  if (countTotal > 0) {
    const passPercentage = Math.ceil((100 * countPass) / countTotal)
    title += `:   running score ${countPass}/${countTotal} = ${passPercentage}%`
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

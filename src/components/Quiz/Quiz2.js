//
//  Libraries
//
import { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
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
const { URL_QUESTIONS } = require('../constants.js')
const sqlClient = 'Quiz/Quiz'
const sqlTable = 'questions'
const maxRows = 200
const log = true
//
//  Global fields
//
let g_row = 0
let g_quizNum = 0
let g_firstTime = true
//===================================================================================
//=  This Component
//===================================================================================
function Quiz2() {
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
  //
  //  Formik
  //
  const initialValues = {
    radioOption: ''
  }
  const validationSchema = Yup.object({
    radioOption: Yup.string()
  })
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
        sqlString: `* from ${sqlTable} order by qid OFFSET 0 ROWS FETCH NEXT ${maxRows} ROWS ONLY`
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
    if (log) console.log('Form data', id)
    //
    //  Update counts
    //
    setCountTotal(countTotal + 1)
    if (id === 1) setCountPass(countPass + 1)
    //
    //  End of data/ Next row
    //
    if (g_row + 1 >= g_quizNum) {
      alert('end of data')
    } else {
      g_row = g_row + 1
      setQuizRow(quizData[g_row])
    }
  }
  //...................................................................................
  //. Data Received
  //...................................................................................
  const DataReceived = () => {
    try {
      //
      //  Numer of rows
      //
      g_quizNum = quizData.length
    } catch (err) {
      setFetchError(err.message)
    } finally {
      setIsLoading(false)
    }
  }
  //
  //  Select an answer
  //
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
    fetchItems()
  }, [])
  //
  //  Populate data message if no data
  //
  let dataError
  isLoading
    ? (dataError = 'Loading ...')
    : !quizData
    ? (dataError = 'Quiz question empty ...')
    : fetchError
    ? (dataError = `Error: ${fetchError}`)
    : (dataError = null)
  //
  //  No data, return
  //
  if (dataError) {
    if (log) console.log('dataError ', dataError)
    return <p style={{ color: 'red' }}>{dataError}</p>
  }
  //
  //  Get the data first time
  //
  if (g_firstTime) {
    g_firstTime = false
    DataReceived()
    setQuizRow(quizData[g_row])
  }
  //
  //  Populate data message if no data yet
  //
  if (!quizRow) {
    dataError = 'Loading ...'
    if (log) console.log('dataError ', dataError)
    return <p style={{ color: 'red' }}>{dataError}</p>
  }
  //
  //  Title
  //
  let title = `Quiz questions ${g_quizNum}`
  if (countTotal > 0) {
    title += `- Passed ${countPass}/${countTotal}`
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {formik => (
          <Form>
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
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Quiz2

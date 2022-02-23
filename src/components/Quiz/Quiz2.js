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
import QuizOptions from './QuizOptions'
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
    // radioOption: Yup.string().required('Required')
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
  const onSubmitForm = values => {
    //
    //  Check form
    //
    if (log) console.log('Form data', values)
    //
    //  Next Row
    //
    g_row = g_row + 1
    setQuizRow(quizData[g_row])
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
    ? (dataError = 'No Row of data received ...')
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
  //  Get the radio buttons first time
  //
  if (g_firstTime) {
    g_firstTime = false
    DataReceived()
    setQuizRow(quizData[g_row])
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitForm}
      >
        {formik => (
          <Form>
            <main className=''>
              {/*.................................................................................................*/}
              {/*  Form Title */}
              {/*.................................................................................................*/}
              <legend className='py-2'>
                <h1 className='text-3xl '>Quiz questions {g_quizNum}</h1>
              </legend>

              {/*.................................................................................................*/}
              {/*  Panel Header */}
              {/*.................................................................................................*/}
              <QuizPanel row={quizRow} />
              {/*.................................................................................................*/}
              {/*  Options */}
              {/*.................................................................................................*/}
              <QuizOptions row={quizRow} />
              {/*.................................................................................................*/}
              {/*  Message */}
              {/*.................................................................................................*/}
              <div className=''>
                <label className='message' htmlFor='text'>
                  {form_message}
                </label>
              </div>
              {/*.................................................................................................*/}
              {/*  Buttons */}
              {/*.................................................................................................*/}
              <button type='submit' value='Submit'>
                Next
              </button>
            </main>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Quiz2

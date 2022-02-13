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
import FormikControl from '../Formik/FormikControl'
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
function Quiz1() {
  //
  //  Define the State variables
  //
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quizData, setQuizData] = useState([])
  const [quizRow, setQuizRow] = useState(null)
  const [radioOptions, setRadioOptions] = useState([])
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
    radioOption: Yup.string().required('Required')
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
    //  Reset form
    //
    g_row = g_row + 1
    getRadioButtons()
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
  //. Create the Radio buttons data
  //...................................................................................
  const getRadioButtons = () => {
    try {
      //
      //  Deconstruct row
      //
      const l_quizRow = quizData[g_row]
      setQuizRow(l_quizRow)
      const { qanswer_correct, qanswer_bad1, qanswer_bad2, qanswer_bad3 } =
        l_quizRow
      //
      //  Row Options array
      //
      let rowOptions = []
      if (qanswer_correct) rowOptions.push(qanswer_correct)
      if (qanswer_bad1) rowOptions.push(qanswer_bad1)
      if (qanswer_bad2) rowOptions.push(qanswer_bad2)
      if (qanswer_bad3) rowOptions.push(qanswer_bad3)
      //
      //  Radio buttons array/object
      //
      let l_radioOptions = []
      let string = ''
      let l_radioOptionsElement = {}
      rowOptions.forEach((radioText, j) => {
        string = `{"key":"${radioText}", "value":"${j + 1}"}`
        l_radioOptionsElement = JSON.parse(string)
        l_radioOptions.push(l_radioOptionsElement)
      })
      //
      //  Create the buttons
      //
      setRadioOptions(l_radioOptions)
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
    getRadioButtons()
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
              <QuizPanel row={quizRow} />
              <FormikControl
                control='radio'
                label=''
                name='radioOption'
                options={radioOptions}
              />
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

export default Quiz1

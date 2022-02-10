import { useState, useEffect } from "react"
import QuizPanel from "./QuizPanel"
import apiRequest from "./apiRequest"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import FormikControl from "./Formik/FormikControl"
//.............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const { URL_QUESTIONS } = require("./constants.js")
const sqlClient = "Quiz/Quiz"
const sqlTable = "questions"
const maxRows = 200
const log = true
//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Row
//
let g_row = 0
//...................................................................................
//.  Define the State variables
//...................................................................................
function Quiz() {
  //...................................................................................
  //.  Define the State variables
  //...................................................................................
  const [fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [quizData, setQuizData] = useState([])
  let row
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState("")

  //--------------------------------------------------------------------
  //.  Formik
  //--------------------------------------------------------------------
  let radioOptions = []

  const initialValues = {
    radioOption: ""
  }
  const validationSchema = Yup.object({
    radioOption: Yup.string().required("Required")
  })

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
          setForm_message("Did not receive expected data")
          throw Error("Did not receive expected data")
        }
        setQuizData(resultData)
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
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = values => {
    //
    //  Check form
    //
    console.log("Form data", values)
    alert("submit data for checking")
    //
    //  Reset form
    //
  }
  //...................................................................................
  //. Create the Radio buttons data
  //...................................................................................
  if (!fetchError && !isLoading) {
    //
    //  Deconstruct row
    //
    if (log) console.log(quizData[g_row])
    row = quizData[g_row]
    if (log) console.log(row)
    const { qanswer_correct, qanswer_bad1, qanswer_bad2, qanswer_bad3 } = row
    //
    //  Row Options array
    //
    let rowOptions = []
    if (qanswer_correct) rowOptions.push(qanswer_correct)
    if (qanswer_bad1) rowOptions.push(qanswer_bad1)
    if (qanswer_bad2) rowOptions.push(qanswer_bad2)
    if (qanswer_bad3) rowOptions.push(qanswer_bad3)
    if (log) console.log(rowOptions)
    //
    //  Radio buttons array/object
    //
    radioOptions = []
    let string = ""
    let radioOptionsElement = {}
    rowOptions.forEach((radioText, j) => {
      if (log) console.log("radioText, index ", radioText, j)
      string = `{"key":"${radioText}", "value":"${j + 1}"}`
      if (log) console.log("string ", string)
      radioOptionsElement = JSON.parse(string)
      if (log) console.log("radioOptionsElement ", radioOptionsElement)

      radioOptions.push(radioOptionsElement)
      if (log) console.log("radioOptions length", radioOptions.length)
    })
    if (log) console.log(radioOptions)
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................

  return (
    <>
      {/* //                                                                              */}
      {/* //  Loading or Fetching error                                                   */}
      {/* //                                                                              */}
      {isLoading && <p>Loading ...</p>}
      {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}

      {/* //                                                                              */}
      {/* //  Data Received                                                              */}
      {/* //                                                                              */}
      {!fetchError && !isLoading && (
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
                  <h1 className='text-3xl '>Quiz</h1>
                </legend>

                {/*.................................................................................................*/}
                <QuizPanel row={row} />
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
                  Submit
                </button>
              </main>
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}

export default Quiz

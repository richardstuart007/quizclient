//
//  Libraries
//
import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
//
//  Sub Components
//
import { QuizSelectFields } from './QuizSelectFields'
import QuizSelectPanel from './QuizSelectPanel'
import QuizGetData from './QuizGetData'
import MakeQueryablePromise from '../MakeQueryablePromise'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const g_log1 = true
const g_log2 = false
//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Initial Values
//
const initialValues = {
  qowner: 'public',
  qgroup1: 'redoubles',
  qgroup2: ''
}
//
//  Saved Values on Submit
//
const savedValues = {
  qowner: '',
  qgroup1: '',
  qgroup2: ''
}
//.............................................................................
//.  Input field validation
//.............................................................................
const validationSchema = Yup.object({
  qowner: Yup.string().required('Required'),
  qgroup1: Yup.string().required('Required')
})
//===================================================================================
function QuizSelect({ setStep }) {
  //
  // Row of data
  //
  const [formValues, setFormValues] = useState(initialValues)
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = (values, submitProps) => {
    //
    //  Save data
    //
    savedValues.qowner = values.qowner
    savedValues.qgroup1 = values.qgroup1
    savedValues.qgroup2 = values.qgroup2
    //
    //  Process promise
    //
    var myPromise = MakeQueryablePromise(QuizGetData(savedValues))
    //
    //  Initial status
    //
    if (g_log1) console.log('Initial pending:', myPromise.isPending()) //true
    if (g_log1) console.log('Initial fulfilled:', myPromise.isFulfilled()) //false
    if (g_log1) console.log('Initial rejected:', myPromise.isRejected()) //false
    //
    //  Resolve Status
    //
    myPromise.then(function (data) {
      if (g_log1) console.log('data ', data)
      if (g_log1) console.log('myPromise ', myPromise)
      if (g_log1) console.log('Final fulfilled:', myPromise.isFulfilled()) //true
      if (g_log1) console.log('Final rejected:', myPromise.isRejected()) //false
      if (g_log1) console.log('Final pending:', myPromise.isPending()) //false
      //
      //  No data
      //
      if (!data) {
        setForm_message('No data found')
      }
      //
      //  Next Step
      //
      else {
        setStep(1)
        return
      }
    })
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitForm}
      enableReinitialize
    >
      {formik => {
        if (g_log2) console.log('Formik props', formik)
        if (g_log2) console.log(`Formik is valid ${formik.isValid}`)
        return (
          <Form>
            <main className=''>
              {/*.................................................................................................*/}
              {/*  Form Title */}
              {/*.................................................................................................*/}
              <legend className='py-2'>
                <h1 className='text-3xl '>Question Selection</h1>
              </legend>

              {/*.................................................................................................*/}
              <QuizSelectPanel EntryFields={QuizSelectFields} />
              {/*.................................................................................................*/}
              {/*  Message */}
              {/*.................................................................................................*/}
              <div className=''>
                <label className='message' htmlFor='text'>
                  {form_message}
                </label>
              </div>
              {/*.................................................................................................*/}
            </main>
            {/*.................................................................................................*/}
            {/*  Buttons */}
            {/*.................................................................................................*/}
            <button type='button' onClick={() => setFormValues(savedValues)}>
              Load saved data
            </button>
            <button type='reset' onClick={() => setFormValues(initialValues)}>
              Reset
            </button>
            <button type='submit' value='Submit' disabled={!formik.isValid}>
              Submit
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default QuizSelect

import React, { useState } from "react"
import { DataEntryFields } from "./DataEntryFields"
import DataEntryPanel from "./DataEntryPanel"
import DataEntryElement from "./DataEntryElement"
import { Formik, Form } from "formik"
import * as Yup from "yup"
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const { URL_QUESTIONS } = require("./constants.js")
const sqlClient = "Quiz/DataEntry"
const log = false
const log2 = false

const EntryFields = Object.entries(DataEntryFields)
console.log(EntryFields)
//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Initial Values
//
const initialValues = {
  qowner: "richard",
  qkey: "",
  qtitle: "",
  qdetail: "",
  qhyperlink1: "",
  qhyperlink2: "",
  qanswer_correct: "",
  qanswer_bad1: "",
  qanswer_bad2: "",
  qanswer_bad3: "",
  qgroup1: "",
  qgroup2: "",
}
//
//  Saved Values on Submit
//
const savedValues = {
  qowner: "",
  qkey: "",
  qtitle: "",
  qdetail: "",
  qhyperlink1: "",
  qhyperlink2: "",
  qanswer_correct: "",
  qanswer_bad1: "",
  qanswer_bad2: "",
  qanswer_bad3: "",
  qgroup1: "",
  qgroup2: "",
}
//.............................................................................
//.  Input field validation
//.............................................................................
const validationSchema = Yup.object({
  qowner: Yup.string().required("Required"),
  qkey: Yup.string().required("Required"),
  qtitle: Yup.string().required("Required"),
  qdetail: Yup.string().required("Required"),
  qanswer_correct: Yup.string().required("Required"),
  qanswer_bad1: Yup.string().required("Required"),
  qanswer_bad2: Yup.string().required("Required"),
  qanswer_bad3: Yup.string().required("Required"),
  qgroup1: Yup.string().required("Required"),
  qgroup2: Yup.string().required("Required"),
})
//...................................................................................
//.  Define the State variables
//...................................................................................
function DataEntry() {
  //
  // Row of data
  //
  const [qid, setQid] = useState(0)

  const [formValues, setFormValues] = useState(initialValues)
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState("Enter Data")
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = (values, submitProps) => {
    //
    //  Save data
    //
    if (log) {
      console.log("Form data", values)
    }
    savedValues.qowner = values.qowner
    savedValues.qkey = values.qkey
    savedValues.qtitle = values.qtitle
    savedValues.qdetail = values.qdetail
    savedValues.qhyperlink1 = values.qhyperlink1
    savedValues.qhyperlink2 = values.qhyperlink2
    savedValues.qanswer_correct = values.qanswer_correct
    savedValues.qanswer_bad1 = values.qanswer_bad1
    savedValues.qanswer_bad2 = values.qanswer_bad2
    savedValues.qanswer_bad3 = values.qanswer_bad3
    savedValues.qgroup1 = values.qgroup1
    savedValues.qgroup2 = values.qgroup2
    if (log) {
      console.log("Saved data", savedValues)
    }
    //
    //  Update database
    //
    databaseUpdate()
    //
    //  Reset form
    //
    submitProps.setSubmitting(false)
    submitProps.resetForm()
  }
  //...................................................................................
  //.  Add to the database
  //...................................................................................
  const databaseUpdate = () => {
    //
    //  Current ID
    //
    const qid_current = qid
    //
    //  Create SQL string
    //
    const bodySql = JSON.stringify({
      sqlClient: sqlClient,
      sqlAction: "UPSERT",
      sqlTable: "questions",
      sqlKeyName: ["qowner", "qkey"],
      sqlRow: savedValues,
    })
    //
    //  Update database
    //
    if (log) {
      console.log(bodySql)
    }
    fetch(URL_QUESTIONS, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: bodySql,
    })
      .then(response => response.json())
      .then(responseJson => {
        const returnObj = responseJson[0]
        if (log) {
          console.log(returnObj)
        }
        //
        //  Message
        //
        const { qid } = returnObj
        setQid(qid)
        let formMessageUpdate
        formMessageUpdate = !returnObj
          ? "Row NOT added to database"
          : (formMessageUpdate =
              qid === qid_current
                ? `Row UPDATED in Database`
                : `Row ADDED to Database`)
        setForm_message(formMessageUpdate)
      })
      .catch(err => {
        setForm_message(err.message)
        console.log(err)
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
        if (log2) {
          console.log("Formik props", formik)
        }
        return (
          <Form>
            <main className=''>
              {/*.................................................................................................*/}
              {/*  Form Title */}
              {/*.................................................................................................*/}
              <legend className='py-2'>
                <h1 className='text-3xl '>
                  Question Data Entry
                  {qid > 0 ? ` (${qid})` : null}
                </h1>
              </legend>

              {/*.................................................................................................*/}
              <div className='MainPanel'>
                <DataEntryPanel EntryFields={EntryFields} />
                {/*.................................................................................................*/}
                {/* <DataEntryElement
                  entry_type='text'
                  entry_name='qowner'
                  entry_label='Owner'
                /> */}
                {/*.................................................................................................*/}
                <DataEntryElement
                  entry_type='text'
                  entry_name='qkey'
                  entry_label='Key'
                />
                {/*.................................................................................................*/}
                <DataEntryElement
                  entry_type='text'
                  entry_name='qtitle'
                  entry_label='Title'
                />
                {/*.................................................................................................*/}
                <DataEntryElement
                  entry_type='text'
                  entry_name='qdetail'
                  entry_label='Detail'
                />
                {/*.................................................................................................*/}
                <DataEntryElement
                  entry_type='text'
                  entry_name='qhyperlink1'
                  entry_label='Hyperlink 1'
                />
                {/*.................................................................................................*/}
                <DataEntryElement
                  entry_type='text'
                  entry_name='qhyperlink2'
                  entry_label='Hyperlink 2'
                />
                {/*.................................................................................................*/}
                <DataEntryElement
                  entry_type='text'
                  entry_name='qanswer_correct'
                  entry_label='Correct Answer'
                />
                {/*.................................................................................................*/}
                <DataEntryElement
                  entry_type='text'
                  entry_name='qanswer_bad1'
                  entry_label='Bad Answer 1'
                />
                {/*.................................................................................................*/}
                <DataEntryElement
                  entry_type='text'
                  entry_name='qanswer_bad2'
                  entry_label='Bad Answer 2'
                />
                {/*.................................................................................................*/}
                <DataEntryElement
                  entry_type='text'
                  entry_name='qanswer_bad3'
                  entry_label='Bad Answer 3'
                />
                {/*.................................................................................................*/}
                <DataEntryElement
                  entry_type='text'
                  entry_name='qgroup1'
                  entry_label='Group 1'
                />
                {/*.................................................................................................*/}
                <DataEntryElement
                  entry_type='text'
                  entry_name='qgroup2'
                  entry_label='Group 2'
                />
                {/*.................................................................................................*/}
              </div>

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
            <button
              type='submit'
              value='Submit'
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default DataEntry

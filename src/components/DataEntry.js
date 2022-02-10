import React, { useState } from "react"
import { DataEntryFields } from "./DataEntryFields"
import DataEntryPanel from "./DataEntryPanel"
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
const sqlTable = "questions"
const log2 = false

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
  qgroup2: ""
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
  qgroup2: ""
}
//
// Current Key values
//
let c_qid = 0
let c_qowner = ""
let c_qkey = ""
//
// Previous Key values
//
let p_qid = 0
let p_qowner = ""
let p_qkey = ""
//
//  Database return ID
//
let rtn_qid = 0
//.............................................................................
//.  Input field validation
//.............................................................................
const validationSchema = Yup.object({
  qowner: Yup.string().required("Required"),
  qkey: Yup.string().required("Required"),
  // qtitle: Yup.string().required("Required"),
  qdetail: Yup.string().required("Required"),
  qanswer_correct: Yup.string().required("Required"),
  qanswer_bad1: Yup.string().required("Required")
  // qanswer_bad2: Yup.string().required("Required"),
  // qanswer_bad3: Yup.string().required("Required"),
  // qgroup1: Yup.string().required("Required"),
  // qgroup2: Yup.string().required("Required")
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
  const [form_message, setForm_message] = useState("")
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = (values, submitProps) => {
    //
    //  Save data
    //
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
    //
    //  Current Key values
    //
    c_qid = qid
    c_qowner = savedValues.qowner
    c_qkey = savedValues.qkey
    //
    //  Update database
    //
    databaseUpdate()
    //
    //  Update Key values
    //
    if (rtn_qid > 0) {
      setQid(rtn_qid)
      c_qid = rtn_qid
      p_qid = rtn_qid
      p_qowner = savedValues.qowner
      p_qkey = savedValues.qkey
    }
    //
    //  Reset form
    //
    submitProps.setSubmitting(false)
    submitProps.resetForm()
    setFormValues(initialValues)
  }
  //...................................................................................
  //.  Add to the database
  //...................................................................................
  const databaseUpdate = () => {
    //
    //  slqAction: UPDATE/UPSERT
    //
    let sqlAction
    c_qid === p_qid && c_qowner === p_qowner && c_qkey === p_qkey
      ? (sqlAction = "UPDATE")
      : (sqlAction = "UPSERT")
    //
    //  UPDATE
    //
    let bodySql
    if (sqlAction === "UPDATE") {
      const sqlWhere = `qid = ${p_qid}`
      bodySql = JSON.stringify({
        sqlClient: sqlClient,
        sqlAction: sqlAction,
        sqlTable: sqlTable,
        sqlWhere: sqlWhere,
        sqlRow: savedValues
      })
    }
    //
    //  UPSERT
    //
    else {
      bodySql = JSON.stringify({
        sqlClient: sqlClient,
        sqlAction: sqlAction,
        sqlTable: sqlTable,
        sqlKeyName: ["qowner", "qkey"],
        sqlRow: savedValues
      })
    }
    //
    //  Update database
    //
    fetch(URL_QUESTIONS, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: bodySql
    })
      .then(response => response.json())
      .then(responseJson => {
        //
        //  No data returned - error object instead
        //
        if (!responseJson[0]) {
          const { returnCatchFunction, returnMessage } = responseJson
          const message = `Error(${returnMessage}) function(${returnCatchFunction})`
          console.log("return data", responseJson)
          setForm_message(message)
          throw message
        }
        //
        //  Data returned
        //
        const returnObj = responseJson[0]
        //
        //  ID returned from DB update
        //
        rtn_qid = 0
        if (returnObj) {
          rtn_qid = returnObj.qid
        }
        //
        //  Message
        //
        let formMessageUpdate
        formMessageUpdate = !returnObj
          ? "Row NOT added to database"
          : (formMessageUpdate =
              rtn_qid === p_qid
                ? `Row (${rtn_qid}) UPDATED in Database`
                : (formMessageUpdate =
                    rtn_qid < p_qid
                      ? `Row (${rtn_qid}) UPSERTED in Database`
                      : `Row (${rtn_qid}) ADDED to Database`))
        setForm_message(formMessageUpdate)
        //
        //  Update Key values
        //
        if (rtn_qid > 0) {
          setQid(rtn_qid)
          c_qid = rtn_qid
          p_qid = rtn_qid
          p_qowner = savedValues.qowner
          p_qkey = savedValues.qkey
        }
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
        if (log2) console.log("Formik props", formik)
        if (log2) console.log(`Formik is valid ${formik.isValid}`)
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
              <DataEntryPanel EntryFields={DataEntryFields} />
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

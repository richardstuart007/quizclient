import React, { useState } from "react"
import DataEntryElement from "./DataEntryElement"
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const { URL_QUESTIONS } = require("./constants.js")
const sqlClient = "Quiz/DataEntry"
//...................................................................................
//.  Define the State variables
//...................................................................................
function DataEntry() {
  //
  // Row of data
  //
  const [qid, setQid] = useState(0)
  const [qowner, setQowner] = useState("")
  const [qkey, setQkey] = useState("")
  const [qtitle, setQtitle] = useState("")
  const [qdetail, setQdetail] = useState("")
  const [qhyperlink1, setQhyperlink1] = useState("")
  const [qhyperlink2, setQhyperlink2] = useState("")
  const [qanswer_correct, setQanswer_correct] = useState("")
  const [qanswer_bad1, setQanswer_bad1] = useState("")
  const [qanswer_bad2, setQanswer_bad2] = useState("")
  const [qanswer_bad3, setQanswer_bad3] = useState("")
  const [qgroup1, setQgroup1] = useState("")
  const [qgroup2, setQgroup2] = useState("")
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState("Enter Data")
  //...................................................................................
  //.  Add to the database
  //...................................................................................
  const onSubmitDataEntry = () => {
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
      sqlRow: {
        qowner: qowner,
        qkey: qkey,
        qtitle: qtitle,
        qdetail: qdetail,
        qhyperlink1: qhyperlink1,
        qhyperlink2: qhyperlink2,
        qanswer_correct: qanswer_correct,
        qanswer_bad1: qanswer_bad1,
        qanswer_bad2: qanswer_bad2,
        qanswer_bad3: qanswer_bad3,
        qgroup1: qgroup1,
        qgroup2: qgroup2,
      },
    })
    //
    //  Update database
    //
    console.log(bodySql)
    fetch(URL_QUESTIONS, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: bodySql,
    })
      .then(response => response.json())
      .then(responseJson => {
        const returnObj = responseJson[0]
        console.log(returnObj)
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
      <div className='dataentry'>
        {/*.................................................................................................*/}
        <DataEntryElement
          entry_label='Owner'
          entry_value={qowner}
          setEntry_value={setQowner}
        />
        {/*.................................................................................................*/}
        <DataEntryElement
          entry_label='Key'
          entry_value={qkey}
          setEntry_value={setQkey}
        />
        {/*.................................................................................................*/}
        <DataEntryElement
          entry_label='Title'
          entry_value={qtitle}
          setEntry_value={setQtitle}
        />
        {/*.................................................................................................*/}
        <DataEntryElement
          entry_label='Detail'
          entry_value={qdetail}
          setEntry_value={setQdetail}
        />
        {/*.................................................................................................*/}
        <DataEntryElement
          entry_label='hyperlink 1'
          entry_value={qhyperlink1}
          setEntry_value={setQhyperlink1}
        />
        {/*.................................................................................................*/}
        <DataEntryElement
          entry_label='hyperlink 2'
          entry_value={qhyperlink2}
          setEntry_value={setQhyperlink2}
        />
        {/*.................................................................................................*/}
        <DataEntryElement
          entry_label='Correct Answer'
          entry_value={qanswer_correct}
          setEntry_value={setQanswer_correct}
        />
        {/*.................................................................................................*/}
        <DataEntryElement
          entry_label='Bad Answer 1'
          entry_value={qanswer_bad1}
          setEntry_value={setQanswer_bad1}
        />
        {/*.................................................................................................*/}
        <DataEntryElement
          entry_label='Bad Answer 2'
          entry_value={qanswer_bad2}
          setEntry_value={setQanswer_bad2}
        />
        {/*.................................................................................................*/}
        <DataEntryElement
          entry_label='Bad Answer 3'
          entry_value={qanswer_bad3}
          setEntry_value={setQanswer_bad3}
        />
        {/*.................................................................................................*/}
        <DataEntryElement
          entry_label='Group 1'
          entry_value={qgroup1}
          setEntry_value={setQgroup1}
        />
        {/*.................................................................................................*/}
        <DataEntryElement
          entry_label='Group 2'
          entry_value={qgroup2}
          setEntry_value={setQgroup2}
        />
        {/*.................................................................................................*/}
      </div>
      {/*.................................................................................................*/}
      {/*  Submit Button */}
      {/*.................................................................................................*/}
      <div className=''>
        <button
          onClick={onSubmitDataEntry}
          className='pa2'
          type='submit'
          value='Submit'
        >
          Submit
        </button>
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
  )
}

export default DataEntry

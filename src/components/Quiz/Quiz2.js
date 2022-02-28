//
//  Libraries
//
import { useState } from 'react'
import { ValtioStore } from './ValtioStore'
import { useSnapshot } from 'valtio'
//
//  Sub Components
//
import QuizPanel from './QuizPanel'
//.............................................................................
//.  Initialisation
//.............................................................................
//
//  Debug logging
//
const g_log1 = false
const g_log2 = false
const g_log3 = false
const g_log4 = true
//
//  Global fields (g_)
//
let g_Quest = []
let g_QuestCount = 0
let g_QuestRow = 0

let g_Ans = []
let g_AnsCount = 0
let g_AnsPass = 0
//===================================================================================
//=  This Component
//===================================================================================
const Quiz = ({ setStep }) => {
  //
  //  Define the State variables
  //
  const [quizRow, setQuizRow] = useState(null)
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //...................................................................................
  //.  First time data received
  //...................................................................................
  const firstLoad = () => {
    //
    //  Get store data & copy to Global Array (g_Quest)
    //
    snapShot.v_Quest.forEach(row => {
      const rowData = {
        qanswer_bad1: row.qanswer_bad1,
        qanswer_bad2: row.qanswer_bad2,
        qanswer_bad3: row.qanswer_bad2,
        qanswer_correct: row.qanswer_correct,
        qdetail: row.qdetail,
        qgroup1: row.qgroup1,
        qgroup2: row.qgroup2,
        qhyperlink1: row.qhyperlink,
        qhyperlink2: row.qhyperlink2,
        qid: row.qid,
        qkey: row.qkey,
        qowner: row.qowner,
        qtitle: row.qtitle
      }
      g_Quest.push(rowData)
    })
    //
    //  Number of questions
    //
    g_QuestCount = g_Quest.length
    //
    // Update State
    //
    setQuizRow(g_Quest[g_QuestRow])
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = id => {
    //
    //  Update count
    //
    if (id === 1) g_AnsPass = g_AnsPass + 1
    //
    //   Write Answers
    //
    g_Ans[g_QuestRow] = id
    if (g_log4) console.log('g_QuestRow ', g_QuestRow, 'id ', id)
    ValtioStore.v_Ans[g_QuestRow] = id
    g_AnsCount = g_AnsCount + 1
    if (g_log2) console.log('g_AnsCount ', g_AnsCount)
    //
    //  End of data
    //
    if (g_QuestRow + 1 >= g_QuestCount) {
      if (g_log3) console.log('v_Ans', snapShot.v_Ans)
      setStep(2)
      return
    }
    //
    //  Next row
    //
    g_QuestRow = g_QuestRow + 1
    setQuizRow(g_Quest[g_QuestRow])
    if (g_log2) console.log('g_QuestRow data', g_QuestRow, g_Quest[g_QuestRow])
  }
  //...................................................................................
  //. Answer Selected
  //...................................................................................
  const handleSelect = id => {
    if (g_log2) console.log(`ID selected ${id}`)
    if (g_log2) console.log('g_QuestRow ', g_QuestRow, 'qid ', quizRow.qid)
    onSubmitForm(id)
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (g_log4) console.log('start g_QuestRow', g_QuestRow)
  if (g_log4)
    console.log(snapShot.v_Reset0, snapShot.v_Reset1, snapShot.v_Reset2)
  //
  //  Initialise global variables
  //
  if (snapShot.v_Reset1) {
    if (g_log4) console.log('Initialise global variables')
    g_Quest = []
    g_QuestCount = 0
    g_QuestRow = 0
    g_Ans = []
    g_AnsCount = 0
    g_AnsPass = 0
  }
  //
  //  Load the data array from the store
  //
  if (snapShot.v_Reset1) firstLoad()
  ValtioStore.v_Reset1 = false
  //
  //  No data
  //
  if (g_QuestCount === 0) {
    if (g_log1) console.log('No data')
    return <p style={{ color: 'red' }}>No data</p>
  }
  if (!quizRow) {
    if (g_log1) console.log('Quiz Row empty')
    return <p style={{ color: 'red' }}>Quiz Row empty</p>
  }
  //
  //  Title
  //
  let title = `Quiz: ${g_QuestRow + 1} of ${g_QuestCount} questions `
  //
  //  Score
  //
  let score = ''
  if (g_AnsCount > 0) {
    const passPercentage = Math.ceil((100 * g_AnsPass) / g_AnsCount)
    score = `Score so far ${g_AnsPass}/${g_AnsCount} = ${passPercentage}%`
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
          <h3 className=' '>{score} </h3>
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

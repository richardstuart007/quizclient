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
//
//  Global fields (g_)
//
let g_data = []
let g_dataCount = 0
let g_dataRow = 0

let g_history = []
let g_historyCount = 0
let g_historyPass = 0
//===================================================================================
//=  This Component
//===================================================================================
function Quiz() {
  if (g_log1) console.log('Start')
  if (g_log1) console.log('start g_dataRow', g_dataRow)
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
    //  Get store data & copy to Global Array (g_data)
    //
    snapShot.v_quizData.forEach(row => {
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
      g_data.push(rowData)
    })
    //
    //  Number of questions
    //
    g_dataCount = g_data.length
    //
    // Update State
    //
    setQuizRow(g_data[g_dataRow])
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = id => {
    //
    //  Update count
    //
    if (id === 1) g_historyPass = g_historyPass + 1
    //
    //   Write History
    //
    g_history[g_dataRow] = id
    ValtioStore.v_history[g_dataRow] = id
    g_historyCount = g_historyCount + 1
    if (g_log2) console.log('g_historyCount ', g_historyCount)
    //
    //  End of data
    //
    if (g_dataRow + 1 >= g_dataCount) {
      if (g_log3) console.log('v_history', snapShot.v_history)
      alert('end of data')
      return
    }
    //
    //  Next row
    //
    g_dataRow = g_dataRow + 1
    setQuizRow(g_data[g_dataRow])
    if (g_log2) console.log('g_dataRow data', g_dataRow, g_data[g_dataRow])
  }
  //...................................................................................
  //. Answer Selected
  //...................................................................................
  const handleSelect = id => {
    if (g_log2) console.log(`ID selected ${id}`)
    if (g_log2) console.log('g_dataRow ', g_dataRow, 'qid ', quizRow.qid)
    onSubmitForm(id)
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Load the data array from the store
  //
  if (!quizRow) firstLoad()
  //
  //  No data
  //
  if (g_dataCount === 0) {
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
  let title = `Quiz: ${g_dataRow + 1} of ${g_dataCount} questions `
  //
  //  Score
  //
  let score = ''
  if (g_historyCount > 0) {
    const passPercentage = Math.ceil((100 * g_historyPass) / g_historyCount)
    score = `Score so far ${g_historyPass}/${g_historyCount} = ${passPercentage}%`
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

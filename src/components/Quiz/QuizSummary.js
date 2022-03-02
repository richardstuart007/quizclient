//
//  Libraries
//
import { useState } from 'react'
import { ValtioStore } from './ValtioStore'
import { useSnapshot } from 'valtio'
import { Button, Typography } from '@material-ui/core'
//
//  Sub Components
//
import QuizHeader from './QuizHeader'
import QuizSummaryCard from './QuizSummaryCard'
import QuizHyperlinks from './QuizHyperlinks'
//.............................................................................
//.  Initialisation
//.............................................................................
//
//  Debug logging
//
const g_log1 = true
//
//  Global fields (g_)
//
let g_Quest = []
let g_QuestRow = 0
let g_Ans = []
//===================================================================================
//=  This Component
//===================================================================================
const QuizSummary = ({ setStep }) => {
  if (g_log1) console.log('Start')
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
    //  Initialise global variables
    //
    if (g_log1) console.log('Initialise global variables')
    g_Quest = []
    g_QuestRow = -1
    g_Ans = []
    //
    //  Get store data - Questions
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
    if (g_log1) console.log('g_Quest ', g_Quest)
    //
    //  Get store data - Answers
    //
    snapShot.v_Ans.forEach(id => {
      if (g_log1) console.log('g_Ans id ', id)
      g_Ans.push(id)
    })
    if (g_log1) console.log('g_Ans ', g_Ans)
    //
    // Start at row 0
    //
    nextQuestion()
  }
  //...................................................................................
  //.  Next Question
  //...................................................................................
  const nextQuestion = () => {
    if (g_log1) console.log('nextQuestion ')
    //
    //  More rows
    //
    if (g_QuestRow + 1 < g_Ans.length) {
      g_QuestRow = g_QuestRow + 1
      setQuizRow(g_Quest[g_QuestRow])
    } else {
      alert('no more data')
    }
  }
  //...................................................................................
  //.  Restart the Quiz
  //...................................................................................
  const handleRestart = () => {
    //
    //  Update the Step and return
    //
    if (g_log1) console.log('handleRestart ')
    ValtioStore.v_Reset0 = true
    ValtioStore.v_Reset1 = true
    ValtioStore.v_Reset2 = true
    setStep(0)
    return
  }
  //...................................................................................
  //.  Previous Question
  //...................................................................................
  const handlePrevious = () => {
    if (g_log1) console.log('Previous Question ')
    //
    //  More rows
    //
    if (g_QuestRow > 0) {
      g_QuestRow = g_QuestRow - 1
      setQuizRow(g_Quest[g_QuestRow])
    }
  }
  //...................................................................................
  //.  Quit Quiz
  //...................................................................................
  const handleQuit = () => {
    //
    //  Update the Step and return
    //
    if (g_log1) console.log('handleQuit ')
    setStep(9)
    return
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (g_log1)
    console.log(snapShot.v_Reset0, snapShot.v_Reset1, snapShot.v_Reset2)

  //
  //  Load the data array from the store
  //
  if (snapShot.v_Reset2) firstLoad()
  ValtioStore.v_Reset2 = false
  //
  //  No data
  //
  if (!quizRow) {
    if (g_log1) console.log('Quiz Row empty')
    return <p style={{ color: 'red' }}>Quiz Row empty</p>
  }
  //
  //  Deconstruct row
  //
  if (g_log1) console.log('quizRow ', quizRow)
  const { qanswer_correct, qanswer_bad1, qanswer_bad2, qanswer_bad3 } = quizRow
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <div>
      <Typography variant='h5'>Quiz summary</Typography>
      <QuizHeader quizRow={quizRow} />
      <Typography variant='h5'>Correct Answer</Typography>
      <QuizSummaryCard key={1} field={qanswer_correct} color='textSecondary' />
      <Typography variant='h5'>Bad Answers - your answer in red</Typography>
      <QuizSummaryCard key={2} field={qanswer_bad1} color='error' />
      <QuizSummaryCard key={3} field={qanswer_bad2} color='textSecondary' />
      <QuizSummaryCard key={4} field={qanswer_bad3} color='textSecondary' />
      <QuizHyperlinks quizRow={quizRow} />

      <Button
        onClick={() => handlePrevious()}
        type='submit'
        color='secondary'
        variant='contained'
      >
        Previous
      </Button>
      <Button
        onClick={() => nextQuestion()}
        type='submit'
        color='secondary'
        variant='contained'
      >
        Next
      </Button>
      <Button
        onClick={() => handleRestart()}
        type='submit'
        color='secondary'
        variant='contained'
      >
        Restart
      </Button>
      <Button
        onClick={() => handleQuit()}
        type='submit'
        color='secondary'
        variant='contained'
      >
        quit
      </Button>
    </div>
  )
}

export default QuizSummary

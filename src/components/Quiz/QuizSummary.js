//
//  Libraries
//
import { useState, useEffect } from 'react'
import { ValtioStore } from './ValtioStore'
import { useSnapshot } from 'valtio'
import { Button, Typography } from '@material-ui/core'
//
//  Sub Components
//
import QuizHeader from './QuizHeader'
import QuizSummaryPanel from './QuizSummaryPanel'
import QuizHyperlinks from './QuizHyperlinks'
//.............................................................................
//.  Initialisation
//.............................................................................
//
//  Debug logging
//
const g_log1 = true
//===================================================================================
const QuizSummary = () => {
  if (g_log1) console.log('Start')
  //
  //  Define the State variables
  //
  const [ansPass, setAnsPass] = useState(0)
  const [ansCount, setAnsCount] = useState(0)
  const [mark, setMark] = useState(0)
  const [quizRow, setQuizRow] = useState(null)
  const [rowIdx, setRowIdx] = useState(0)
  const [quizQuest, setQuizQuest] = useState([])
  const [quizAns, setQuizAns] = useState([])
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //...................................................................................
  //.  First time data received
  //...................................................................................
  const firstLoad = () => {
    //
    //  Initialise global variables
    //
    if (g_log1) console.log('Initialise global variables')
    //
    //  Get store data - Questions
    //
    let quest = []
    snapShot.v_Quest.forEach(row => {
      const rowData = { ...row }
      quest.push(rowData)
    })
    if (g_log1) console.log('quest ', quest)
    setQuizQuest(quest)
    //
    //  Get store data - Answers
    //
    let Ans = []
    let AnsPass = 0
    snapShot.v_Ans.forEach(id => {
      Ans.push(id)
      if (id === 1) AnsPass++
    })
    if (g_log1) console.log('Ans ', Ans)
    const AnsCount = Ans.length
    setAnsCount(AnsCount)
    setAnsPass(AnsPass)
    setQuizAns(Ans)
    //
    //  Mark%
    //
    setMark(Math.round((100 * AnsPass) / AnsCount))
    //
    // Start at row 0
    //
    if (g_log1) console.log('quest[0] ', quest[0])
    setRowIdx(0)
    setQuizRow(quest[0])
  }
  //...................................................................................
  //.  Next Question
  //...................................................................................
  const nextQuestion = () => {
    if (g_log1) console.log('nextQuestion ')
    console.log(quizQuest)
    //
    //  More rows
    //
    console.log(rowIdx, ansCount)
    if (rowIdx + 1 < ansCount) {
      const RowIdx = rowIdx + 1
      setRowIdx(RowIdx)
      setQuizRow(quizQuest[RowIdx])
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
    ValtioStore.v_Page = 'QuizSelect'
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
    if (rowIdx > 0) {
      const RowIdx = rowIdx - 1
      setRowIdx(RowIdx)
      setQuizRow(quizQuest[RowIdx])
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
    ValtioStore.v_Page = 'QuizGoodbye'
    return
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Load the data array from the store
  //
  useEffect(() => {
    firstLoad()
  }, [])
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
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <div>
      <Typography variant='subtitle1'>
        Quiz Summary ({mark}%) {ansPass} out of {ansCount}
      </Typography>

      <QuizHeader quizRow={quizRow} />
      <QuizSummaryPanel quizRow={quizRow} quizanswer={quizAns[rowIdx]} />
      <QuizHyperlinks quizRow={quizRow} />
      <br />
      <Typography variant='subtitle2'>Navigation</Typography>

      <Button
        onClick={() => handlePrevious()}
        type='submit'
        variant='contained'
        style={{ backgroundColor: 'yellow' }}
      >
        Previous
      </Button>

      <Button
        onClick={() => nextQuestion()}
        type='submit'
        variant='contained'
        style={{ backgroundColor: 'yellow' }}
      >
        Next
      </Button>
      <Button
        onClick={() => handleRestart()}
        type='submit'
        variant='contained'
        style={{ backgroundColor: 'yellow' }}
      >
        Restart
      </Button>
      <Button
        onClick={() => handleQuit()}
        type='submit'
        variant='contained'
        style={{ backgroundColor: 'yellow' }}
      >
        quit
      </Button>
    </div>
  )
}

export default QuizSummary

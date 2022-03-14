//
//  Libraries
//
import { useState } from 'react'
import { ValtioStore } from './ValtioStore'
import { useSnapshot } from 'valtio'
//
//  Sub Components
//
import QuizHeader from './QuizHeader'
import QuizPanel from './QuizPanel'
import QuizLinearProgress from './QuizLinearProgress'
import QuizHyperlinks from './QuizHyperlinks'
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
//===================================================================================
const Quiz = () => {
  //
  //  Define the State variables
  //
  const [rowIdx, setRowIdx] = useState(0)
  const [quizRow, setQuizRow] = useState(null)
  const [quizQuest, setQuizQuest] = useState([])
  const [questCount, setQuestCount] = useState(0)
  const [ansPass, setAnsPass] = useState(0)
  const [ansCount, setAnsCount] = useState(0)
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //...................................................................................
  //.  First time data received
  //...................................................................................
  const firstLoad = () => {
    //
    //  Get store data & copy to Global Array
    //
    let quest = []
    snapShot.v_Quest.forEach(row => {
      const rowData = { ...row }
      if (g_log4) console.log('rowData ', rowData)
      quest.push(rowData)
    })
    //
    // Update State
    //
    setQuizQuest(quest)
    setQuestCount(quest.length)
    setQuizRow(quest[rowIdx])
  }
  //...................................................................................
  //.  Form Submit
  //...................................................................................
  const onSubmitForm = id => {
    //
    //  Update count
    //
    if (g_log4) console.log('rowIdx ', rowIdx, 'id ', id)
    if (id === 1) {
      const nextAnsPass = ansPass + 1
      setAnsPass(nextAnsPass)
    }
    //
    //   Write Answers
    //
    if (g_log4) console.log('rowIdx ', rowIdx, 'id ', id)
    ValtioStore.v_Ans[rowIdx] = id
    const nextAnsCount = ansCount + 1
    setAnsCount(nextAnsCount)
    if (g_log2) console.log('nextAnsCount ', nextAnsCount)
    //
    //  End of data
    //
    if (rowIdx + 1 >= questCount) {
      if (g_log3) console.log('v_Ans', snapShot.v_Ans)
      ValtioStore.v_Page = 'QuizSummary'
      return
    }
    //
    //  Next row
    //
    const nextRowIdx = rowIdx + 1
    setRowIdx(nextRowIdx)
    setQuizRow(quizQuest[nextRowIdx])
    if (g_log2) console.log('rowIdx data', rowIdx, quizQuest[rowIdx])
  }
  //...................................................................................
  //. Answer Selected
  //...................................................................................
  const handleSelect = id => {
    if (g_log2) console.log(`ID selected ${id}`)
    if (g_log2) console.log('rowIdx ', rowIdx, 'qid ', quizRow.qid)
    onSubmitForm(id)
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................
  if (g_log4) console.log('start rowIdx', rowIdx)
  if (g_log4) console.log(snapShot.v_Reset0, snapShot.v_Reset1)
  //
  //  Load the data array from the store
  //
  if (snapShot.v_Reset1) firstLoad()
  ValtioStore.v_Reset1 = false
  //
  //  No data
  //
  if (questCount === 0) {
    if (g_log1) console.log('No data')
    return <p style={{ color: 'red' }}>No data</p>
  }
  if (!quizRow) {
    if (g_log1) console.log('Quiz Row empty')
    return <p style={{ color: 'red' }}>Quiz Row empty</p>
  }
  if (g_log4) console.log('quiz row ', quizRow)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <QuizHeader quizRow={quizRow} />
      <main className=''>
        <QuizPanel
          key={quizRow.qid}
          quizRow={quizRow}
          handleSelect={handleSelect}
        />
        <QuizHyperlinks quizRow={quizRow} />
        <QuizLinearProgress
          count={ansCount}
          total={questCount}
          text={'Progress'}
        />
        <QuizLinearProgress
          count={ansPass}
          total={ansCount}
          text={'Score'}
        ></QuizLinearProgress>
      </main>
    </>
  )
}

export default Quiz

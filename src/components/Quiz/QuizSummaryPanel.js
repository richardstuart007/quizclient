//
//  Libraries
//
import React from 'react'
//
//  Sub Components
//
import QuizSummaryCard from './QuizSummaryCard'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Constants
//
const log = false
//===================================================================================
//=  This Component
//===================================================================================
const QuizSummaryPanel = ({ row }) => {
  //
  //  Deconstruct row
  //
  if (log) console.log('row ', row)
  const {
    qid,
    qtitle,
    qdetail,
    qanswer_correct,
    qanswer_bad1,
    qanswer_bad2,
    qanswer_bad3
  } = row
  //
  //  Format Panel
  //
  return (
    <>
      <div className='MainPanel'>
        <p>{qid} </p>
        <p>{qtitle} </p>
        <p>{qdetail} </p>
        <br></br>
        <h2>Click on an answer to select</h2> <br></br>
      </div>
      <QuizSummaryCard key={1} answer={qanswer_correct} />
      <QuizSummaryCard key={2} answer={qanswer_bad1} />
      <QuizSummaryCard key={3} answer={qanswer_bad2} />
      <QuizSummaryCard key={4} answer={qanswer_bad3} />
    </>
  )
}

export default QuizSummaryPanel

//
//  Libraries
//
import React from 'react'
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
const QuizOptions = ({ row }) => {
  //
  //  Deconstruct row
  //
  if (log) console.log('row ', row)
  const { qanswer_correct, qanswer_bad1, qanswer_bad2, qanswer_bad3 } = row
  //
  //  Row Options array
  //
  let rowOptions = []
  if (qanswer_correct) rowOptions.push(qanswer_correct)
  if (qanswer_bad1) rowOptions.push(qanswer_bad1)
  if (qanswer_bad2) rowOptions.push(qanswer_bad2)
  if (qanswer_bad3) rowOptions.push(qanswer_bad3)
  //
  //  Format Panel
  //
  return (
    <div className='MainPanel'>
      <br></br>
      <h2>Answers</h2> <br></br>
      <p>{qanswer_correct} </p> <br></br>
      <p>{qanswer_bad1} </p> <br></br>
      <p>{qanswer_bad2} </p> <br></br>
      <p>{qanswer_bad3} </p> <br></br>
    </div>
  )
}

export default QuizOptions

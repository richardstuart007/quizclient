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
const QuizPanel = ({ row }) => {
  //
  //  Deconstruct row
  //
  if (log) console.log('row ', row)
  const { qid, qtitle, qdetail } = row
  //
  //  Format Panel
  //
  return (
    <div className='MainPanel'>
      <p>{qid} </p>
      <p>{qtitle} </p>
      <p>{qdetail} </p>
    </div>
  )
}

export default QuizPanel

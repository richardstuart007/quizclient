//
//  Libraries
//
import React from 'react'
//
//  Sub Components
//
import QuizCard from './QuizCard'
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
const QuizPanel = ({ row, handleSelect }) => {
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
  //  Answers array
  //
  let Answers = []
  let j = 0
  loadAnswers(qanswer_correct)
  loadAnswers(qanswer_bad1)
  loadAnswers(qanswer_bad2)
  loadAnswers(qanswer_bad3)
  //
  //  Load Answers array with answer element
  //
  function loadAnswers(answer) {
    if (answer) {
      j++
      const ansObj = {
        random: Math.random(),
        id: j,
        details: answer
      }
      Answers.push(ansObj)
    }
  }
  //
  //  Sort the Answers by the random sort id
  //
  Answers.sort((a, b) => (a.random > b.random ? 1 : -1))
  if (log) console.log(Answers)
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
      {Answers.map(answer => (
        <QuizCard key={answer.id} answer={answer} handleSelect={handleSelect} />
      ))}
    </>
  )
}

export default QuizPanel

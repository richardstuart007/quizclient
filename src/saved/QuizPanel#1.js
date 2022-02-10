import React from "react"
const log = true

const QuizPanel = ({ row }) => {
  //
  //  Deconstruct row
  //
  if (log) console.log("row ", row)
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
    <div className='MainPanel'>
      <p>qid {qid} </p>
      <p>qtitle {qtitle} </p>
      <p>qdetail {qdetail} </p>
      <p>qanswer_correct {qanswer_correct} </p>
      <p>qanswer_bad1 {qanswer_bad1} </p>
      <p>qanswer_bad2 {qanswer_bad2} </p>
      <p>qanswer_bad3 {qanswer_bad3} </p>
    </div>
  )
}

export default QuizPanel

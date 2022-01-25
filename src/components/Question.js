import React from "react";

const Question = ({ question }) => {
  const {
    qid,
    qowner,
    qkey,
    qtitle,
    qdetail,
    qhyperlink1,
    qhyperlink2,
    qanswer_correct,
    qanswer_bad1,
    qanswer_bad2,
    qanswer_bad3,
  } = question;
  return (
    <tr className='table-row'>
      <td className='table-cell text-red-500'>{qid}</td>
      <td className='table-cell active_row'>{qowner}</td>
      <td className='table-cell active_row'>{qkey}</td>
      <td className='table-cell'>{qtitle}</td>
      <td className='table-cell'>{qdetail}</td>
      <td className='table-cell'>{qhyperlink1}</td>
      <td className='table-cell'>{qhyperlink2}</td>
      <td className='table-cell'>{qanswer_correct}</td>
      <td className='table-cell'>{qanswer_bad1}</td>
      <td className='table-cell'>{qanswer_bad2}</td>
      <td className='table-cell'>{qanswer_bad3}</td>
    </tr>
  );
};

export default Question;

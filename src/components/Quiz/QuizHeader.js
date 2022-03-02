//
//  Libraries
//
import { Typography } from '@material-ui/core'
//.............................................................................
//.  Initialisation
//.............................................................................
//
//  Debug logging
//
const g_log1 = true
//===================================================================================
//=  This Component
//===================================================================================
const QuizHeader = ({ quizRow }) => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Deconstruct row
  //
  if (g_log1) console.log('quizRow ', quizRow)
  const { qid, qtitle, qdetail } = quizRow
  //
  //  Title
  //
  const formTitle = `(${qid}): ${qtitle}`
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <div>
      <Typography variant='h5'>{formTitle}</Typography>
      <Typography variant='h7'>{qdetail}</Typography>
    </div>
  )
}

export default QuizHeader

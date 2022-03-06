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
  const { qtitle, qdetail } = quizRow
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <div>
      {qtitle && (
        <Typography variant='subtitle1' gutterBottom>
          {qtitle}
        </Typography>
      )}

      <Typography variant='h6' color='secondary' gutterBottom>
        {qdetail}
      </Typography>
    </div>
  )
}

export default QuizHeader

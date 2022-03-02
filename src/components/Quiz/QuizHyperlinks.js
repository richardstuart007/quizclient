//
//  Libraries
//
import QuizSummaryCard from './QuizSummaryCard'
import { Typography } from '@material-ui/core'

//===================================================================================
//=  This Component
//===================================================================================
const QuizHyperlinks = ({ quizRow }) => {
  //...................................................................................
  //.  Main Line
  //...................................................................................
  //
  //  Deconstruct row
  //
  const { qhyperlink1, qhyperlink2 } = quizRow
  //
  //  Empty links
  //
  if (!qhyperlink1 && !qhyperlink2) {
    return null
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <div>
      <Typography variant='h5'>Hyperlinks</Typography>
      <QuizSummaryCard key={5} field={qhyperlink1} color='textSecondary' />
      <QuizSummaryCard key={6} field={qhyperlink2} color='textSecondary' />
    </div>
  )
}

export default QuizHyperlinks

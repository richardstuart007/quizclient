//
//  Libraries
//
import { Typography, Button } from '@material-ui/core'
//.............................................................................
//.  Initialisation
//.............................................................................
//
//  Debug logging
//
const g_log1 = false

//===================================================================================
const QuizHyperlinks = ({ quizRow }) => {
  //
  //  Deconstruct row
  //
  const { qhyperlink1, qhyperlink2 } = quizRow
  if (g_log1) console.log('quizRow ', quizRow)
  if (g_log1) console.log('qhyperlink1 ', qhyperlink1)
  if (g_log1) console.log('qhyperlink2 ', qhyperlink2)
  //
  //  Empty links
  //
  if (!qhyperlink1 && !qhyperlink2) {
    return null
  }
  //
  //  Hyperlink open
  //
  const openTab = hyperlink => () => {
    if (g_log1) console.log('hyperlink ', hyperlink)
    window.open(hyperlink, '_blank')
  }
  //...................................................................................
  //.  Render the component
  //...................................................................................
  return (
    <div>
      <Typography variant='h6'>Help Articles</Typography>
      {qhyperlink1 && (
        <Button
          onClick={openTab(qhyperlink1)}
          type='submit'
          color='secondary'
          variant='outlined'
          size='small'
        >
          Article1
        </Button>
      )}

      {qhyperlink2 && (
        <Button
          onClick={openTab(qhyperlink2)}
          type='submit'
          color='secondary'
          variant='outlined'
          size='small'
        >
          Article2
        </Button>
      )}
    </div>
  )
}

export default QuizHyperlinks

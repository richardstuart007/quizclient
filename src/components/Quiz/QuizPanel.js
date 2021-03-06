//
//  Libraries
//
import { Typography } from '@material-ui/core'
import { teal } from 'material-ui-colors'
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
const QuizPanel = ({ quizRow, handleSelect }) => {
  //
  //  Deconstruct row
  //
  if (log) console.log('quizRow ', quizRow)
  const { qanswer_correct, qanswer_bad1, qanswer_bad2, qanswer_bad3 } = quizRow
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
      <Typography
        variant='subtitle2'
        gutterBottom
        style={{ color: teal['A700'] }}
      >
        Select your answer by clicking
      </Typography>

      {Answers.map((answer, key) => (
        <QuizCard key={key} answer={answer} handleSelect={handleSelect} />
      ))}
    </>
  )
}

export default QuizPanel

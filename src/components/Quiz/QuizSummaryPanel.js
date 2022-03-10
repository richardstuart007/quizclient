//
//  Libraries
//
import { Typography } from '@material-ui/core'
//
//  Components
//
import QuizSummaryCard from './QuizSummaryCard'

export default function QuizSummaryPanel({ quizRow, quizanswer }) {
  const { qanswer_correct, qanswer_bad1, qanswer_bad2, qanswer_bad3 } = quizRow
  let Ans = []
  Ans.push(qanswer_bad1)
  Ans.push(qanswer_bad2)
  Ans.push(qanswer_bad3)

  console.log(quizanswer)

  return (
    <>
      <Typography variant='subtitle2' style={{ color: 'green' }}>
        Answer
      </Typography>

      <QuizSummaryCard
        key={1}
        field={qanswer_correct}
        backgroundColor={quizanswer === 1 ? 'green' : 'white'}
      />

      {quizanswer === 1 ? (
        <Typography variant='subtitle2' style={{ color: 'green' }}>
          Your Answer is CORRECT
        </Typography>
      ) : (
        <Typography variant='subtitle2' style={{ color: 'red' }}>
          YOUR answer is INCORRECT
        </Typography>
      )}

      {Ans.map((answer, index) => (
        <QuizSummaryCard
          key={index + 1}
          field={answer}
          backgroundColor={quizanswer - 2 === index ? 'red' : 'white'}
        />
      ))}
    </>
  )
}

//
//  Libraries
//
import { useState } from 'react'
//
//  Sub Components
//
import QuizSelect from './QuizSelect'
import Quiz from './Quiz'
import QuizSummary from './QuizSummary'
//
//  Debug logging
//
const g_log1 = true
//===================================================================================
function QuizControl() {
  //
  //  Define the State variables
  //
  const [step, setStep] = useState(0)
  //
  //  Present the selected component
  //
  switch (step) {
    case 0:
      return <QuizSelect setStep={setStep} />
    case 1:
      return <Quiz setStep={setStep} />
    case 2:
      return <QuizSummary setStep={setStep} />
    case 9:
      return <p>Thanks and Goodbye!</p>
    default:
      if (g_log1) console.log(`Step ${step} waiting for data`)
      return <p>waiting for data</p>
  }
}

export default QuizControl

import { useState } from 'react'
import Quiz from './Quiz2'
import QuizSummary from './QuizSummary'

let g_step = 1

function QuizControl() {
  //
  //  Define the State variables
  //
  const [step, setStep] = useState(1)

  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1)
  }

  // Go back to prev step
  const prevStep = () => {
    setStep(step - 1)
  }

  switch (g_step) {
    case 1:
      return <Quiz nextStep={nextStep} />
    case 2:
      return <QuizSummary nextStep={nextStep} prevStep={prevStep} />
    default:
      console.log('This is a multi-step form built with React.')
  }
}

export default QuizControl

//
//  Libraries
//
import { useState } from 'react'
//
//  Sub Components
//
import QuizGetData from './QuizGetData'
import Quiz from './Quiz2'
import QuizSummary from './QuizSummary'
//===================================================================================
//=  This Component
//===================================================================================
function QuizControl() {
  //
  //  Define the State variables
  //
  const [step, setStep] = useState(0)
  //
  //  Load the Store
  //
  if (step === 0) {
    QuizGetData()
    setStep(1)
  }
  //
  //  Present the selected component
  //
  switch (step) {
    case 1:
      return <Quiz step={step} setStep={setStep} />
    case 2:
      return <QuizSummary step={step} setStep={setStep} />
    default:
      console.log('This is a multi-step form built with React.')
  }
}

export default QuizControl

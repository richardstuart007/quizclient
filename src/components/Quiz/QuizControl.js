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
  const [step, setStep] = useState(null)
  //
  //  Load the Store
  //
  if (step === null) {
    console.log('QuizGetData')
    const data = QuizGetData().then(() => {
      console.log('data returned')
      console.log(data)
      setStep(1)
    })
  }
  //
  //  Present the selected component
  //
  switch (step) {
    case null:
      return <p>No data step null</p>
    case 0:
      return <p>No data step 0</p>
    case 1:
      return <Quiz step={step} setStep={setStep} />
    case 2:
      return <QuizSummary step={step} setStep={setStep} />
    default:
      console.log(`Step ${step}`)
  }
}

export default QuizControl

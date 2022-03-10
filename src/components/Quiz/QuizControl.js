//
//  Libraries
//
import { useState } from 'react'
import { ValtioStore } from './ValtioStore'
import { useSnapshot } from 'valtio'
//
//  Sub Components
//
import QuizGetData from './QuizGetData'
import Quiz from './Quiz'
import QuizSummary from './QuizSummary'
//
//  Debug logging
//
const g_log1 = true
const g_log2 = true
//===================================================================================
//=  This Component
//===================================================================================
function QuizControl() {
  //
  //  Define the State variables
  //
  const [step, setStep] = useState(null)
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  if (g_log2)
    console.log('CONTROL step ', step, 'snapShot.v_Reset0  ', snapShot.v_Reset0)
  //
  //  Reset or First Time
  //
  if (step === null || snapShot.v_Reset0) {
    //
    // Reset flags & step
    //
    setStep(0)
    ValtioStore.v_Reset0 = false
    ValtioStore.v_Reset1 = true
    //
    // Get data
    //
    QuizGetData().then(() => {
      setStep(1)
    })
  }
  //
  //  Present the selected component
  //
  switch (step) {
    case 0:
      if (g_log1) console.log(`Step ${step} waiting for data`)
      return <p>waiting for data</p>
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

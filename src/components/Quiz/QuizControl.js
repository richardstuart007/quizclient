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
const g_log1 = false
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
  //
  //  Reset the store
  //
  if (g_log2)
    console.log('CONTROL step ', step, 'snapShot.v_Reset0  ', snapShot.v_Reset0)
  if (step === null || snapShot.v_Reset0) {
    setStep(0)
    ValtioStore.v_Reset0 = false
    if (g_log1) console.log('QuizGetData')
    const data = QuizGetData().then(() => {
      if (g_log1) console.log('data returned')
      if (g_log1) console.log(data)
      ValtioStore.v_Reset1 = true
      ValtioStore.v_Reset2 = true
      setStep(1)
    })
  }
  if (g_log1)
    console.log(snapShot.v_Reset0, snapShot.v_Reset1, snapShot.v_Reset2)
  //
  //  Present the selected component
  //
  if (g_log1) console.log('step ', step)
  switch (step) {
    case 0:
      return <p>No data step 0</p>
    case 1:
      return <Quiz setStep={setStep} />
    case 2:
      return <QuizSummary setStep={setStep} />
    case 9:
      return <p>Thanks and Goodbye!</p>
    default:
      console.log(`Step ${step}`)
  }
}

export default QuizControl

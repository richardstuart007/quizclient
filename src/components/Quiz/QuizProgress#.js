//
//  Libraries
//
import { useState, useEffect } from 'react'
import { MobileStepper, Typography } from '@material-ui/core'
//.............................................................................
//.  Initialisation
//.............................................................................
//
//  Debug logging
//
const g_log1 = true
//===================================================================================
//=  This Component
//===================================================================================
const QuizProgress = ({ ansCount, questCount }) => {
  if (g_log1) console.log('ansCount ', ansCount)
  if (g_log1) console.log('questCount ', questCount)
  //
  //  State
  //
  const [activeStep, setActiveStep] = useState(0)
  const [steps, setSteps] = useState(0)
  //
  //  Set steps (one time only)
  //
  useEffect(() => {
    setSteps(questCount)
  }, [])
  //
  //  Set active step
  //
  useEffect(() => {
    setActiveStep(ansCount - 1)
  }, [ansCount])

  if (g_log1) console.log('activeStep ', activeStep)
  if (g_log1) console.log('steps ', steps)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Typography variant='h7'>
        <br />
        Progress: {activeStep + 1} of {steps}
      </Typography>
      <MobileStepper
        variant='progress'
        steps={steps}
        position='static'
        activeStep={activeStep}
        sx={{ maxWidth: 400, flexGrow: 1 }}
      />
    </>
  )
}

export default QuizProgress

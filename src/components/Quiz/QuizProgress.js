//
//  Libraries
//
import { useState } from 'react'
import { MobileStepper, Button } from '@material-ui/core'
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
  const [progress, setProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }
  //...................................................................................
  //.  Main Line
  //...................................................................................

  // if (g_log1) console.log('ansCount ', ansCount)
  // if (g_log1) console.log('questCount ', questCount)
  // //
  // //  Get Percentage
  // //
  // let l_progress = 0
  // if (ansCount > 0) {
  //   l_progress = Math.round((100 * ansCount) / questCount)
  // }
  // if (g_log1) console.log('progress ', l_progress)
  // setProgress(l_progress)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <MobileStepper
      variant='progress'
      steps={6}
      position='static'
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button size='small' onClick={handleNext} disabled={activeStep === 5}>
          Next
        </Button>
      }
      backButton={
        <Button size='small' onClick={handleBack} disabled={activeStep === 0}>
          Back
        </Button>
      }
    />
  )
}

export default QuizProgress

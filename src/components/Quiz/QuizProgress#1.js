//
//  Libraries
//
import { useState, useEffect } from 'react'
import { LinearProgress, Typography, Box } from '@material-ui/core'
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
const QuizProgress = props => {
  const { ansCount, questCount } = props
  if (g_log1) console.log('ansCount ', ansCount)
  if (g_log1) console.log('questCount ', questCount)
  //
  //  State
  //
  const [activeStep, setActiveStep] = useState(0)
  const [steps, setSteps] = useState(0)
  const [progress, setProgress] = useState(1)
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
    setActiveStep(ansCount)
    setProgress(Math.round((100 * ansCount) / questCount))
  }, [ansCount])

  if (g_log1) console.log('activeStep ', activeStep)
  if (g_log1) console.log('steps ', steps)
  if (g_log1) console.log('progress ', progress)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <Box sx={{ width: '100%' }}>
      Progress <br />
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant='determinate' value={progress} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant='body2'
            color='text.secondary'
          >{`${progress}%`}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default QuizProgress

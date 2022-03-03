//
//  Libraries
//
import { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'
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
const QuizScore = ({ ansPass, ansCount }) => {
  if (g_log1) console.log('ansPass ', ansPass)
  if (g_log1) console.log('ansCount ', ansCount)
  //
  //  State
  //
  const [pass, setPass] = useState(0)
  const [count, setCount] = useState(0)
  //
  //  Set active step
  //
  useEffect(() => {
    setPass(ansPass)
    setCount(ansCount)
  }, [ansPass, ansCount])
  //
  //  No score - return
  //
  if (ansCount === 0) return null
  //
  //  Score
  //
  const passPercentage = Math.ceil((100 * pass) / count)
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Typography variant='h7' gutterBottom>
        Score: {pass} out of {count}
      </Typography>
      <Typography variant='h7'>
        <br />
        {passPercentage}%
      </Typography>
    </>
  )
}

export default QuizScore

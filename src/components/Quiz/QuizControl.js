//
//  Libraries
//
import { useState } from 'react'
import { ValtioStore } from './ValtioStore'
import { useSnapshot } from 'valtio'
//
//  Sub Components
//
import QuizSelect from './QuizSelect'
import Quiz from './Quiz'
import QuizSummary from './QuizSummary'
import QuizRegister from './QuizRegister'
import QuizSignin from './QuizSignin'
//
//  Debug logging
//
const g_log1 = true
//===================================================================================
function QuizControl() {
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  //
  //  Retrieve the state
  //
  const page = snapShot.v_Page
  console.log(' page ', page)
  //
  //  Present the selected component
  //
  switch (page) {
    case 'QuizRegister':
      return <QuizRegister />
    case 'QuizSignin':
      return <QuizSignin />
    case 'QuizSelect':
      return <QuizSelect />
    case 'Quiz':
      return <Quiz />
    case 'QuizSummary':
      return <QuizSummary />
    case 'QuizGoodbye':
      return <p>Thanks and Goodbye!</p>
    default:
      return <p>waiting for data</p>
  }
}

export default QuizControl

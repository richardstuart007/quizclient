import { proxy } from 'valtio'

const ValtioStore = proxy({
  v_Page: 'QuizSignin',
  v_Email: '',
  v_Name: '',
  v_Quest: [],
  v_Ans: [],
  v_Reset0: true,
  v_Reset1: true,
  v_Reset2: true
})

export { ValtioStore }

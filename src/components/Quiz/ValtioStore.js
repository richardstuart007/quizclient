import { proxy } from 'valtio'

const ValtioStore = proxy({
  v_Quest: [],
  v_Ans: [],
  v_Reset0: true,
  v_Reset1: true,
  v_Reset2: true
})

export { ValtioStore }

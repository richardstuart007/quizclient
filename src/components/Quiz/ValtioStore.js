import { proxy } from 'valtio'

const ValtioStore = proxy({
  v_quizData: [],
  v_history: []
})

export { ValtioStore }

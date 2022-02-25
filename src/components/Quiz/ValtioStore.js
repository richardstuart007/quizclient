import { proxy } from 'valtio'

const valtioStore = proxy({
  v_quizData: [],
  v_history: []
})

export { valtioStore }

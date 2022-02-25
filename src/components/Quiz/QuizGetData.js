//
//  Libraries
//
import { valtioStore } from './ValtioStore'
//
//  Sub Components
//
import apiRequest from '../apiRequest'
//
// Constants
//
const sqlClient = 'Quiz/QuizGetData'
const { URL_QUESTIONS } = require('../constants.js')
const { SQL_TABLE } = require('../constants.js')
const { SQL_MAXROWS } = require('../constants.js')
//
//  Debug logging
//
const log1 = true
//--------------------------------------------------------------------
//.  fetch data
//--------------------------------------------------------------------
const fetchItems = async () => {
  try {
    //
    //  Setup actions
    //
    const method = 'post'
    const body = {
      sqlClient: sqlClient,
      sqlAction: 'SELECTSQL',
      sqlString: `* from ${SQL_TABLE} order by qid OFFSET 0 ROWS FETCH NEXT ${SQL_MAXROWS} ROWS ONLY`
    }
    //
    //  SQL database
    //
    const resultData = await apiRequest(method, URL_QUESTIONS, body)
    //
    // update Store
    //
    valtioStore.v_quizData = resultData
  } catch (err) {
    console.log(err.message)
  }
}
//===================================================================================
//=  This Component
//===================================================================================
function QuizGetData() {
  //
  //  Initial fetch of data
  //
  fetchItems()
}

export default QuizGetData

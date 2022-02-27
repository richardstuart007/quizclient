//
//  Libraries
//
import { ValtioStore } from './ValtioStore'
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
//===================================================================================
//=  This Component
//===================================================================================
async function QuizGetData() {
  //--------------------------------------------------------------------
  //.  fetch data
  //--------------------------------------------------------------------
  const fetchItems = async () => {
    try {
      const sqlString = `* from ${SQL_TABLE} order by qid OFFSET 0 ROWS FETCH NEXT ${SQL_MAXROWS} ROWS ONLY`
      if (log1) console.log(sqlString)
      //
      //  Setup actions
      //
      const method = 'post'
      const body = {
        sqlClient: sqlClient,
        sqlAction: 'SELECTSQL',
        sqlString: sqlString
      }
      //
      //  SQL database
      //
      const resultData = await apiRequest(method, URL_QUESTIONS, body)
      if (log1) console.log('data returned ', resultData)
      //
      // No data
      //
      if (!resultData[0]) {
        throw Error('No data received')
      }
      //
      // update ValtioStore
      //
      if (log1) console.log('update store', resultData)
      ValtioStore.v_quizData = resultData
      //
      // Errors
      //
    } catch (err) {
      console.log(err.message)
    }
  }
  //--------------------------------------------------------------------
  //-  Initial fetch of data
  //--------------------------------------------------------------------
  const resultData = fetchItems()
  return resultData
}

export default QuizGetData

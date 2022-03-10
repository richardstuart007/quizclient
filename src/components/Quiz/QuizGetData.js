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
      // update ValtioStore - Questions
      //
      if (log1) console.log('update v_Quest', resultData)
      ValtioStore.v_Quest = resultData
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
  //
  // Clear the store
  //
  if (log1) console.log('clear v_Quest')
  ValtioStore.v_Quest = []
  if (log1) console.log('clear v_Ans')
  ValtioStore.v_Ans = []
  //
  // Load the store
  //
  const resultData = fetchItems()
  return resultData
}

export default QuizGetData

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
const g_log1 = true
//===================================================================================
async function QuizGetData({ qowner, qgroup1, qgroup2 }) {
  //--------------------------------------------------------------------
  //.  fetch data
  //--------------------------------------------------------------------
  const fetchItems = async () => {
    try {
      //
      //  sqlString
      //
      let sqlString = `* from ${SQL_TABLE} where qowner = '${qowner}' and qgroup1 = '${qgroup1}' `
      if (qgroup2) sqlString = sqlString.concat(` and qgroup2 = "${qgroup2}"`)
      sqlString = sqlString.concat(
        ` order by qowner, qkey OFFSET 0 ROWS FETCH NEXT ${SQL_MAXROWS} ROWS ONLY`
      )
      if (g_log1) console.log('sqlString ', sqlString)
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
      if (g_log1) console.log('data returned ', resultData)
      //
      // No data
      //
      if (!resultData[0]) {
        throw Error('No data received')
      }
      //
      //  Randomly sort questions
      //
      const sortedData = randomSort(resultData)
      if (g_log1) console.log(sortedData)
      //
      // update ValtioStore - Questions
      //
      if (g_log1) console.log('update v_Quest', sortedData)
      ValtioStore.v_Quest = sortedData
      //
      // Return data
      //
      if (g_log1) console.log('return data 1', sortedData)
      return sortedData
      //
      // Errors
      //
    } catch (err) {
      console.log(err.message)
    }
  }
  //--------------------------------------------------------------------
  //-  RandomSort
  //--------------------------------------------------------------------
  const randomSort = resultData => {
    //
    //  Load the workArray
    //
    let workArray = []
    resultData.forEach(data => {
      const ansObj = {
        random: Math.random(),
        details: data
      }
      workArray.push(ansObj)
    })
    //
    //  Sort the workArray
    //
    workArray.sort((a, b) => (a.random > b.random ? 1 : -1))
    if (g_log1) console.log(workArray)
    //
    //  Strip out the random element
    //
    const sortedArray = workArray.map(data => {
      return data.details
    })
    //
    //  Return sorted array
    //
    if (g_log1) console.log(sortedArray)
    return sortedArray
  }
  //--------------------------------------------------------------------
  //-  Initial fetch of data
  //--------------------------------------------------------------------
  //
  // Clear the store
  //
  if (g_log1) console.log('clear v_Quest')
  ValtioStore.v_Quest = []
  if (g_log1) console.log('clear v_Ans')
  ValtioStore.v_Ans = []
  //
  // Load the store
  //
  const resultData = fetchItems()
  //
  // Return promise
  //
  if (g_log1) console.log('return data 3', resultData)
  return resultData
}

export default QuizGetData

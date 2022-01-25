//
//  Process API updates
//
import axios from "axios"
//
// methods - post(get), post(update), delete(delete), put(upsert)
//
const apiRequest = async (method, url, data) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: data,
    })
    //
    //  Errors
    //
    if (response.statusText !== "OK")
      throw Error("Did not receive expected data")
    //
    //  Return rows
    //
    return response.data
    //
    //  Catch Error
    //
  } catch (err) {
    console.log(err)
    return null
  }
}

export default apiRequest

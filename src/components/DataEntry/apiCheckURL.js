const apiCheckURL = url => {
  const g_log1 = true
  if (g_log1) console.log('URL ', url)
  try {
    const urlOptions = {
      method: 'HEAD',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(url, urlOptions)
      .then(response => {
        if (g_log1) console.log(url, '--1--', response)
        return true
      })
      .catch(error => {
        if (g_log1) console.log(url, '--2--', error)
        return false
      })
  } catch (error) {
    if (g_log1) console.log(url, '--3--', error)
    return false
  }
}

export default apiCheckURL

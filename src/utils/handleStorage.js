export const getStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (err) {
    console.log(err)
    return localStorage.getItem(key)
  }
}

export const setStorage = (key, data) => {
  try {
    const stringData = JSON.stringify(data)
    localStorage.setItem(key, stringData)
  } catch (err) {
    console.log(err)
  }
}

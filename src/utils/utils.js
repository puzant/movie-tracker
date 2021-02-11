import Constants from '../constants/Constants'

const sortInDescendingOrder = (data, key) => {
  return data.sort((a,b) => {
    return key === Constants.TMDB_API_DATA.RELEASE_DATE ?
     new Date(b[key]) - new Date(a[key]) 
     : b[key] - a[key]
  })
}

const sortInAscendingOrder = (data, key) => {
  return data.sort((a,b) => {
    return key === Constants.TMDB_API_DATA.RELEASE_DATE ?
     new Date(a[key]) - new Date(b[key]) 
     : a[key] - b[key]
  })
}

const generateRandomColorValue = () => Math.floor(Math.random()*16777215).toString(16)

export default {
  sortInDescendingOrder,
  sortInAscendingOrder,
  generateRandomColorValue
}
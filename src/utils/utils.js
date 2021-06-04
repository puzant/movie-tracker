import moment from 'moment'
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

const getMovieLanguage = (language) => {
  switch(language) {
    case Constants.MOVIE_LANGUAGE_CODE.ENGLISH:
      return 'English'
    case Constants.MOVIE_LANGUAGE_CODE.FRENCH:
      return 'French'
    case Constants.MOVIE_LANGUAGE_CODE.JAPANESE:
      return 'japanese'
    case Constants.MOVIE_LANGUAGE_CODE.KOREAN:
      return 'korean'
    default:
      return 'English'
  }
}

const formatReviewDate = (creationDate) => {
  return moment(creationDate).format('MMMM Do YYYY')
}

const generateRandomColorValue = () => Math.floor(Math.random()*16777215).toString(16)

export default {
  sortInDescendingOrder,
  sortInAscendingOrder,
  generateRandomColorValue,
  getMovieLanguage,
  formatReviewDate
}

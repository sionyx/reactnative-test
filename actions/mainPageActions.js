import {
  UPDATE_MAIN_PAGE,
  MAIN_PAGE_UPDATE_SUCCEEDED,
  MAIN_PAGE_UPDATE_FAILED,
} from './actionConstants'

var REQUEST_MAINPAGE_URL = 'http://mobs.mail.ru/news/v2/getMainPage';

export function updateMainPage() {
  return (dispatch) => {
    dispatch({
      type: UPDATE_MAIN_PAGE,
    })

    fetch(REQUEST_MAINPAGE_URL)
      .then((response) => response.json())
      .then((responseData) => {
        dispatch({
          type: MAIN_PAGE_UPDATE_SUCCEEDED,
          payload: responseData
        })

        // this.mainPageLoaded(responseData);
      })
      .done();

    // setTimeout(() => {
    //   dispatch({
    //     type: MAIN_PAGE_UPDATE_SUCCEEDED,
    //     payload: [] //hotnews
    //   })
    // }, 3000)
  }
}

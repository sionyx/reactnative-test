import {
  OPEN_SIDE_MENU,
} from './actionConstants'

export function openSideMenu() {
  return (dispatch) => {
    dispatch({
      type: OPEN_SIDE_MENU,
    })
  }
}

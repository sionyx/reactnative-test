import {
  OPEN_SIDE_MENU,
} from '../actions/actionConstants'

const initialState = {
  menuOpened: false,
}

export default function sideMenuReducer(state = initialState, action) {
  switch (action.type) {
      case OPEN_SIDE_MENU:
        return { ...state,
          menuOpened: true
        }
      default:
        return state;
    }
}

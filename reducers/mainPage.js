import {
  UPDATE_MAIN_PAGE,
  MAIN_PAGE_UPDATE_SUCCEEDED,
  MAIN_PAGE_UPDATE_FAILED,
} from '../actions/actionConstants'

const initialState = {
  hotnews: [],
  categories: [],
  informer: {},
  loaded: false,
}

export default function mainPage(state = initialState, action) {
  switch (action.type) {
      case UPDATE_MAIN_PAGE:
        return { ...state,
          loaded: false
        }
      case MAIN_PAGE_UPDATE_SUCCEEDED:
        return { ...state,
          hotnews: action.payload.hot_news,
          categories: action.payload.categories_main,
          informer: action.payload.informer,
          loaded: true
        }
      default:
        return state;
    }
}

import {APP_THEME} from '../Type';

const initialState = {
  isDarkTheme: [],
  currentThemeColor: '#FFFFFF',
  defaultThemeColor: '#FFFFFF',
};
const appThemeReducer = (state = initialState, action) => {
  // console.log(action, 'action');
  switch (action.type) {
    case APP_THEME:
      return {
        ...state,
        isDarkTheme: action.appTheme.isDarkMode,
        currentThemeColor: action.appTheme.themeBackgroundColor,
      };
    default:
      return state;
  }
};
export default appThemeReducer;

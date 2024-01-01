import {APP_THEME} from '../Type';

export const appThemeAction = appTheme => {
  return {
    type: APP_THEME,
    appTheme: appTheme,
  };
};

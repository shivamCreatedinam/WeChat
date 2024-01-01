// reducer.js
import { STORE_ADMIN_AREA } from '../Type';

const initialState = {
  adminArea: null,
  // other initial state properties
};

const CityNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_ADMIN_AREA:
      return {
        ...state,
        adminArea: action.payload,
      };
    // handle other action types as needed
    default:
      return state;
  }
};

export default CityNameReducer;

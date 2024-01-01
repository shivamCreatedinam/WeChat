// actions.js
import { STORE_ADMIN_AREA } from '../Type';

export const storeAdminArea = (adminArea) => {
  return {
    type: STORE_ADMIN_AREA,
    payload: adminArea,
  };
};

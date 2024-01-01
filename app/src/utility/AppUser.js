import EventEmitter from 'events';
class AppUser {
  static appInstance = null;
  emitterInst = null;
  /**
   * @returns {AppUser}
   */
  static getInstance() {
    if (this.appInstance == null) {
      AppUser.appInstance = new AppUser();
      AppUser.appInstance.emitterInst = new EventEmitter();
    }
    return this.appInstance;
  }

  token = '';
  userId = '';
  userDetails = {
    full_name: '',
    email: '',
  };
  selectedCityId = '';
  selectedCityName = '';
  fcmToken = null;
  itemsIncartCount = 0;
  wishlistCount = 0;
  smsHash = '';
  notif = null;
}
export default AppUser;

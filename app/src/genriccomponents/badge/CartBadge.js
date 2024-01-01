import React from 'react';
import {View, Text, Image} from 'react-native';
import {isPlatformIOS} from '../../utility/Utils';
import resources from '../../../res';
import Store from '../../redux/store/Store';

function IconWithBadge({name, badgeCount, tintColor}) {
  return (
    <View style={{width: 24, height: 24, margin: 5}}>
      <Image
        source={name}
        resizeMode={'contain'}
        style={{
          width: isPlatformIOS ? 25 : 25,
          height: isPlatformIOS ? 25 : 25,
          borderWidth: 0,
          tintColor,
        }}
      />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -8,
            top: -4,
            backgroundColor: resources.colors.appColor,
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontFamily: resources.fonts.bold,
              borderWidth: 0,
              marginTop: !isPlatformIOS ? -1 : 0,
              textAlign: 'center',
            }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}
export function CartIconWithBadge(props) {
  let state = Store.getState();
  const {cartBadgeCount} = state.cartReducer;
  return <IconWithBadge {...props} badgeCount={cartBadgeCount} />;
}

export function WishlistIconWithBadge(props) {
  let state = Store.getState();
  const {wishlistBadgeCount} = state.wishlistReducer;
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} badgeCount={wishlistBadgeCount} />;
}

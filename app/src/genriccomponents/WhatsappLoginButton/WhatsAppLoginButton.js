import React, {useCallback} from 'react';
import {View, Linking, Text, TouchableOpacity, Image} from 'react-native';
import resources from '../../../res';
import Button from '../button/Button';

const WhatsAppLoginButton = () => {
  const handlePress = useCallback(async () => {
    const url =
      'https://cityfurnish.authlink.me?redirectUri=cityfurnishotpless://otpless';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      await Linking.openURL(url);
      // Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#48A06C',
        height: 48,
        padding: 16,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '100%',
        borderRadius: 8,
        paddingHorizontal: 24,
      }}
      onPress={handlePress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text
            style={{
              color: 'white',
              fontFamily: resources.fonts.medium,
              fontSize: 16,
            }}>
            Continue with WhatsApp
          </Text>
        </View>
        <View>
          <Image
            source={resources.images.icon_whatapps}
            style={{width: 20, height: 20}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WhatsAppLoginButton;

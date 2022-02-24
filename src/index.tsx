import React from 'react';
import { NativeModules, Platform, View } from 'react-native';
import LottieLoader from './nativeComponents/LottieLoader';

const LINKING_ERROR =
  `The package 'appboss-custom-code' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const AppbossCustomCode = NativeModules.AppbossCustomCode
  ? NativeModules.AppbossCustomCode
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function multiply(a: number, b: number): Promise<number> {
  return AppbossCustomCode.multiply(a, b);
}

const LoginScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'blue' }}>
      <LottieLoader />
    </View>
  );
};

LoginScreen.navigationOptions = { header: null };

export const applyCustomCode = (externalCodeSetup: any) => {
  // call custom code api here

  externalCodeSetup.navigationApi.replaceScreenComponent(
    'LoginScreen',
    LoginScreen
  );
};

import React from "react";
import {View} from "react-native";
import LottieLoader from "./src/nativeComponents/LottieLoader";

const LoginScreen = () => {
	return (
		<View style={{flex: 1, backgroundColor: "blue"}}>
			<LottieLoader />
		</View>
	);
};

LoginScreen.navigationOptions = {header: null};

export const applyCustomCode = (externalCodeSetup: any) => {
	// call custom code api here

	externalCodeSetup.navigationApi.replaceScreenComponent(
		"LoginScreen",
		LoginScreen
	);
};

export {default as nativeModulesConfig} from "./native_modules.config.js";

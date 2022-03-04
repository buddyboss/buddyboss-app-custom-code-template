import React from "react";
import {View} from "react-native";
import LottieView from "lottie-react-native";

const TestScreen = () => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#42f5d7"
			}}
		>
			<LottieView source={require("./lottie.json")} autoPlay loop />
		</View>
	);
};

TestScreen.navigationOptions = {header: null};

export const applyCustomCode = (externalCodeSetup: any) => {
	// call custom code api here
	externalCodeSetup.navigationApi.replaceScreenComponent(
		"LoginScreen",
		TestScreen
	);
};

export {default as nativeModulesConfig} from "./native-modules.config.js";

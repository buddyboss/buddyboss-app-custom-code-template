import { Alert } from "react-native";
import { ExternalCodeSetup } from "../src/externalCode";
import NativeModuleExampleScreen from "./NativeModuleExamples";

export const applyCustomCode = (externalCodeSetup:  ExternalCodeSetup) => {
	// call custom code api here
	externalCodeSetup.navigationApi.addNavigationRoute(
		"NativeModuleExampleScreen",
		"NativeModuleExampleScreen",
		NativeModuleExampleScreen,
		"All"
	);

	externalCodeSetup.deeplinksApi.setDeeplinksReturnValueFilter((
		defaultVal, 
		linkObject, 
		navService
	) => {
		// console.log(linkObject);
		if(linkObject.url.match(/native_modules/)) {
			console.log(linkObject)
			navService.navigate("NativeModuleExampleScreen");
			return true;
		}
		return defaultVal;
	});
};
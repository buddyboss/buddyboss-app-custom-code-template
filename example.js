import {Observable} from "rxjs";
import React from "react";
import {Text, TextInput, View} from "react-native";

export const applyCustomCode = externalCodeSetup => {
	// call custom code api here

    externalCodeSetup.indexJsApi.addIndexJsFunction(() => {
		console.log("function from external set upo");
	});

	const reducerName = "external reducer";

	externalCodeSetup.reduxApi.addReducer(
		reducerName,
		(s = {type: "demo"}, a) => s
	);

	externalCodeSetup.reduxApi.addEpic("external epic", actions =>
		Observable.empty()
	);

	externalCodeSetup.reduxApi.wrapEpic(
		"loadHomeScreen",
		epic => (actions, store, dep) => epic(actions, store, dep)
	);

	externalCodeSetup.reduxApi.wrapReducer(
		"homeScreen",
		reducer => (state = reducer(undefined, {type: "demo"}), a) =>
			reducer(state, a)
	);

	externalCodeSetup.reduxApi.addPersistorConfigChanger(config => ({
		...config,
		whitelist: [...config.whitelist, reducerName]
	}));

	externalCodeSetup.navigationApi.addNavigatorCreatedCallback(navigator => {
		//debugger;

		let dispatch = navigator.dispatch;
		console.log("navigator created");
	});

	externalCodeSetup.navigationApi.replaceScreenComponent("SignupScreen", () => (
		<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
			<Text>Hello from custom Login Screen</Text>
			<TextInput placeholder={"login"} />
			<TextInput placeholder={"password"} />
		</View>
	));

	// externalCodeSetup.navigationApi.addNavigationRoute(
	// 	"SignupScreen",
	// 	() => <Text>I am custom SignupScreen</Text>,
	// 	"Auth"
	// );

	externalCodeSetup.cssApi.addGlobalStyle("container", {
		backgroundColor: "white"
	});
};

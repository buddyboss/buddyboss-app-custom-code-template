import React from "react";
import {View, Dimensions, StyleSheet} from "react-native";
// import LottieView from "lottie-react-native";
import MapView, {Marker, ProviderPropType} from 'react-native-maps';

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const styles = StyleSheet.create({
	container: {
	  ...StyleSheet.absoluteFillObject,
	  justifyContent: 'flex-end',
	  alignItems: 'center',
	},
	scrollview: {
	  alignItems: 'center',
	  paddingVertical: 40,
	},
	map: {
	  width: 250,
	  height: 250,
	},
  });

const TestScreen = () => {
	const region = {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
	return (
		<View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#42f5d7"
			}}
		>
			{/* <LottieView source={require("./lottie.json")} autoPlay loop /> */}
			<MapView
				// provider={this.props.provider}
				style={styles.map}
				scrollEnabled={false}
				zoomEnabled={false}
				pitchEnabled={false}
				rotateEnabled={false}
				initialRegion={region}>
				<Marker
					title="This is a title"
					description="This is a description"
					coordinate={region}
				/>
			</MapView>
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

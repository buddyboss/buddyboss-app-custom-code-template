import React, { useCallback, useEffect, useRef } from "react";
import {ScrollView, Text, TouchableOpacity, View, Dimensions} from "react-native";
import {LineChart} from "react-native-chart-kit";
import LottieView from 'lottie-react-native';
import MapView from 'react-native-maps';

const ExampleScreen = ({navigation}) => {
    const renderBackButton = useCallback(() => (
        <TouchableOpacity 
                onPress={() => navigation.goBack()} 
                style={styles.backButton}
            >
                <Text style={styles.backButtonText}>{"Go Back"}</Text>
        </TouchableOpacity>
    ), [navigation]);

    const renderLineChart = useCallback(() => (
        <View style={styles.lineChartContainer}>
            <Text style={styles.sectionTitle}>
                Sample Line Chart
            </Text>
            <LineChart
                data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100
                    ]
                    }
                ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726"
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 16
                }}
            />
            </View>
    ), []);

    const lottieAnimation = useRef(null);
    const renderLottieView = useCallback(() => (
        <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Lottie Animation</Text>
            <View style={{flex: 1}}>
                <LottieView
                    ref={lottieAnimation}
                    autoPlay={true}
                    source={require("./lottieExample.json")}
                    loop={true}
                    enableMergePathsAndroidForKitKatAndAbove={true}
                />
            </View>
        </View>
    ), []);

    const renderMapView = useCallback(() => (
        <MapView 
            style={styles.contentContainer}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        />
    ), []);

    useEffect(() => {
        lottieAnimation.current?.play()
    }, [])

    return (
        <View style={styles.container}>
            {renderBackButton()}
            <ScrollView >
                {renderLineChart()}
                {renderLottieView()}
                {renderMapView()}
            </ScrollView>
        </View>
    );
}

ExampleScreen.navigationOptions = {
    header: null
}

export default ExampleScreen;

const styles = {
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    backButton: {
        alignSelf: "flex-start",
        marginTop: 60,
        marginBottom: 25,
        marginLeft: 16
    },
    backButtonText: {
        fontWeight: "bold",
        color: "blue"
    },
    sectionTitle: {
        fontWeight: "600",
        color: "#222222",
        marginLeft: 16
    },
    lineChartContainer: {
        marginVertical: 20
    },
    contentContainer: {
        marginVertical: 20,
        width: Dimensions.get("window").width,
        height: 220
    }
}
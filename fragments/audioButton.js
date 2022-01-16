import React from "react"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, StyleSheet } from "react-native";

const AudioButton = (props) => {
    return (
        <View>
            <Icon name={props.name} size={props.size} color={props.color} onPress={props.onPress} solid={props.solid}/>
        </View>
    )
}

export default AudioButton
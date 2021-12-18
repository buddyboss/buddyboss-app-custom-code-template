import React from "react";
import {View, Text, Image, Button} from "react-native";

const Podcast = (props) => {
    const podData = props.navigation.state.params.podData
    console.log(podData)
    return(<View style={{justifyContent: 'center', alignItems: 'stretch'}}>
        <Image source={{uri: podData.featured_image_urls.medium}} style={{width: 300, height: 300}} />
        <Text>{podData.title.rendered}</Text>
        <Button onPress={()=>props.navigation.navigate('audioplayer', { podData: podData })} title="Play" />

        <Button onPress={()=>props.navigation.goBack()} title='Go Back'/>
    </View>)
}

export default Podcast
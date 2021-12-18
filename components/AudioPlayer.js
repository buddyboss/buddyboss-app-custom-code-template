import React, {useEffect, useState, useRef} from "react";
import {View, Text, Button, Image} from "react-native";
import { useSelector, connect } from 'react-redux';
import TrackPlayer from 'react-native-track-player';

const initPlayer = async () => {
    await TrackPlayer.setupPlayer();
}
const AudioPlayer = props => {
    
    const podData = props.navigation.state.params.podData
    
    const firstRun = useRef(true)
    const startPlayer = async () => {
        
        // Add a track to the queue
        await TrackPlayer.add({
            id: podData.id,
            url: podData.mp3,
            title: podData.title.rendered,
            artwork: podData.featured_image_urls.thumbnail
        });
    
        // Start playing it
        await TrackPlayer.play();
    }

    useEffect(()=>{
        
            initPlayer().then(()=>startPlayer())
            
    }, [])

    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#010101", color: "#FFFFFF"}}> 
            
            <Button
                title="Play"
                onPress={()=>TrackPlayer.play()}
                />
            <Button
                title="Stop"
                onPress={() => TrackPlayer.stop()}
                />
            
        </View>
    );

}

const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
    radiocoResponse: state.audioPlayerReducer.liveRadio
  });

export default connect(mapStateToProps)(AudioPlayer)
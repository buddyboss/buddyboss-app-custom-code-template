import React, {useEffect, useState, useRef} from "react";

import {View, Text, Button, Image} from "react-native";
import {connect, useSelector, useDispatch} from "react-redux";
import {getApi} from "@src/services";
import TrackPlayer from 'react-native-track-player';

const MyCustomScreen = props => {
    const [radiocoResponse, setRadiocoResponse] = useState({});
    const [artwork, setArtworkUrl] = useState();
    const pod = useSelector(state=>state.audioPlayerReducer)
    const firstRun = useRef(true)
    // Player Controls
    const start = async () => {
        // Set up the player
        await TrackPlayer.setupPlayer();
    
        // Add a track to the queue
        await TrackPlayer.add({
            id: 'trackId',
            url: 'https://s4.radio.co/s0e01ae4e1/listen',
            title: 'Track Title',
            artist: 'Track Artist',
            artwork: ''
        });
    
        // Start playing it
        await TrackPlayer.play();
    
    }
    
    const playHandler = () => {

    }

    useEffect(()=>{
        console.log('Pod',pod)
    },[pod])
    
    useEffect(() => {
        const api = getApi(props.config);
        const url = "https://public.radio.co/stations/s0e01ae4e1/status";
        const method = "get";
        
        api.customRequest(
            url,          // Endpoint suffix or full url. Suffix will be appended to the site url that app uses. Example of a suffix is "wp-json/buddyboss/v1/members". Example of full url would be "https://app-demos.buddyboss.com/learndash/wp-json/buddyboss/v1/members". 
            method,       // get, post, patch, delete etc.
            {},               // JSON, FormData or any other type of payload you want to send in a body of request
            null,             // validation function or null
            {},               // request headers object
            [true]   // true - if full url is given, false if you use the suffix for the url. False is default.
        ).then(response => {
            setRadiocoResponse(response.data)
            props.dispatch({
                type: "SET_RADIO_DATA",
                payload: response.data
            })
            setArtworkUrl(response.data.current_track.artwork_url)
        });
    }, [])

    return (
        <View style={{flex: 1, flexDirection:"row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#010101", color: "#FFFFFF"}}> 
            <View>
            <Text>Radio Status: {radiocoResponse.status}</Text>  
            
             <Button
                title="Play"
                onPress={() => start()}
                />
             <Button
                title="Stop"
                onPress={() => TrackPlayer.stop()}
                />
            </View>
            <View>
            <Text style={{color: "#FFFFFF"}}>Current: {radiocoResponse.current_track?.title}</Text>
            </View>
        </View>
    );
  
};

const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
    radiocoResponse: state.audioPlayerReducer.liveRadio
  });
    
export default connect(mapStateToProps)(MyCustomScreen);
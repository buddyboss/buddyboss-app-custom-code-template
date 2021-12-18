import React, {useEffect, useRef} from "react";
import {View, Text, Button} from "react-native";
import {connect, useDispatch, useSelector} from "react-redux";
import { getPodcastData } from "../api/podcastsApi";

const Podcasts = props => {
    const dispatch = useDispatch()
    const apState = useSelector(state=>state.audioPlayerReducer)
     
    useEffect(()=>{
        getPodcastData(props.accessToken).then(data =>{
            dispatch({type: 'LOAD_PODCAST_DATA',
                payload: data})
        })
       
    },[])

    useEffect(()=>{
        console.log("Pod Data: ", apState)
        console.log("Nav:", props.navigation)
    }, [apState.podcasts])

    return(
        <View style={{flex: 1, justifyContent: "flex-start", alignItems: "center", backgroundColor: "#010101", color: "#FFFFFF"}}>
            
            {apState.podcasts.length > 0 && apState.podcasts.map(el=> 
            (
                <View>
                <Text style={{color: '#ffffff'}}>{el.title.rendered}</Text>
                    <Button title="Play" onPress={() => props.navigation.navigate('podcast', { podData: el })}/>
                </View>
            ))}
        </View>
    )
}

const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
  });
    
export default connect(mapStateToProps)(Podcasts);
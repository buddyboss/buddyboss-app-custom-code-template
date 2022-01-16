import React, {useEffect, useState, useRef} from "react";
import {View, Text, Image, Button, StyleSheet, Dimensions, ImageBackground} from "react-native";
import { useSelector, connect, useDispatch } from 'react-redux';

import { convertToTimestamp } from "../api/utilities";

import TrackPlayer, {State} from 'react-native-track-player';
import AudioButton from "../fragments/audioButton";

const AudioPlayer = props => {
    //const timer = useRef()
    const [timer, setTimer] = useState(false);
    const [playerState, setPlayerState] = useState('UNLOADED');
    const [isFirstRun, setFirstRun] = useState(true)
    const [isPlayerSmall, setPlayerSize] = useState(false)
    const [title, setTitle] = useState('Loading')
    
    
    const playingId = useRef(false)

    const dispatch = useDispatch()
    const podData = useSelector(state=>state.audioPlayerReducer.currentTrack)
    const position = useSelector(state=>state.audioPlayerReducer.currentPosition)
    const playlist = useSelector(state=>state.audioPlayerReducer.playlist)
    const playlistTrans = useSelector(state=>state.audioPlayerReducer.playlistTrans)
    
    const colors = props.config.styles.colors
        
    const initPlayer = async () => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.updateOptions({
            stopWithApp: true,
            
        });
        console.log("AP:TRACKPLAYER: Player Initiated")
    }

    const startTimer = () => {
        
        const time = setInterval(() => {
            //console.log("AP:TRACKPLAYER: Interval")
            TrackPlayer.getPosition().then((pos)=>{
               // console.log("AP:TRACKPLAYER: Sending to Handler")
               updateHandler(pos)
               return pos              
            })
            .then((pos)=>{
                //writePositionMp3(podData.id, ~~(pos))

            });
            
            
        }, 1000);
        setTimer(time)
    }
    const updateHandler = (pos) => {
        //console.log("AP:TRACKPLAYER: Data recieved:", pos)
        const payload = {
            position: ~~(pos),
            id: podData.id
        }
        
        dispatch({
            type: 'SET_POSITION',
            payload: payload
        })
    }
    const stopTimer = () => {
        clearInterval(timer)
        updateHandler(0)
    }

    const addTrack = async ( item ) => {
        console.log("AP:TRACKPLAYER: Added to Cue")
        await TrackPlayer.add({
            id: item.id,
            url: item.mp3, 
            title: item.title.rendered,
            artwork: item.featured_image_urls.medium,
            artist: 'Clyde Lewis',
            album: 'Aftermath.Media'
        })
    }
       
    const startPlayer = async () => {
        
        // Add a track to the queue
        await TrackPlayer.add({
            id: podData.id,
            url: podData.mp3, 
            title: podData.title.rendered,
            artwork: podData.featured_image_urls.medium,
            artist: 'Clyde Lewis',
            album: 'Aftermath.Media'
        })

        // Start playing it
        await TrackPlayer.play();

        setPlayerState('PLAY')
        startTimer()
        setTitle(podData.title.rendered)
        playingId.current = podData.id
    }

    useEffect(()=>{
        console.log("UE_AP:PODDATA:", podData)
        console.log("UE_AP:PLAYERSTATE:", playerState)
        timer && clearInterval(timer)
        if (playingId.current !== podData.id) {
            initPlayer().then(()=>startPlayer())   
        }
    }, [podData])

    useEffect(()=>{
        console.log("UE_AP:TRANSTRACKUPDATE:", playlistTrans)
        addTrack(playlistTrans).then(()=>{
            dispatch({
                type: 'CUE_TRACK',
                payload: playlistTrans
            })
        })
    }, [playlistTrans])

    const skipToNext = () => {
        TrackPlayer.skipToNext().then(()=>{
            updateTitle()
        }) 
          
    }

    const skipToPrev = () => {
        TrackPlayer.skipToPrevious()
        
    }

    const updateTitle = async () => {
        
        let trackObject = await TrackPlayer.getCurrentTrack().then((trackIndex)=>{
            TrackPlayer.getTrack(trackIndex)
        });
        console.log(`Title: ${trackObject.title}`);
        setTitle(trackObject.title)
    }
    const image = { uri: "https://reactjs.org/logo-og.png" };
    return (
    <View style={ styles(colors).mainContainerSmall } >
        <View style={styles(colors).metaContainer}>
            
            {/* {!isPlayerSmall && <View style={styles(colors).imageContainer}>
                {podData && <Image style={styles(colors).image} source={{ uri: podData.featured_image_urls.medium }} />}
               
            </View>} */}
         
                <Text style={styles(colors).headerText}>{podData.title.rendered}</Text>
                <Text style={styles(colors).defaultText}>{convertToTimestamp(position)}</Text>
                <View style={styles(colors).buttonContainer}> 
                   {/*  <AudioButton
                        name="backward"
                        color="red"
                        size={32}
                        solid
                        onPress={updateTitle}
                        /> */}
                    <AudioButton
                        name="backward"
                        color="grey"
                        size={32}
                        solid
                        onPress={()=>TrackPlayer.seekTo(position - 30)}
                        />
                    {(playerState === 'STOP' || playerState === 'PAUSE') && <AudioButton 
                        name="play-circle"
                        color="grey"                       
                        size={48}
                        solid
                        onPress={()=>{
                            TrackPlayer.play()
                            startTimer()
                            setPlayerState('PLAY')
                        }}
                        />}
                    {(playerState === 'PLAY') && <AudioButton 
                        name="pause-circle"
                        color="#3b5998"
                        size={48}
                        solid             
                        onPress={() => {
                            TrackPlayer.pause()
                            setPlayerState('PAUSE')
                        }}
                    />}
                    <AudioButton
                        name="forward"
                        color="grey"
                        size={32}
                        solid
                        onPress={()=>TrackPlayer.seekTo(position + 30)}
                        />
                   {/*  <AudioButton
                        name="forward"
                        color="red"
                        size={32}
                        solid
                        onPress={skipToNext}
                        /> */}
                </View>
           
        </View>
        {/* <Button title="Hide" onPress={()=>setPlayerSize(!isPlayerSmall)} /> */}
    </View>
    );

}

const styles = props => StyleSheet.create({
    
    mainContainerSmall: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: props.bottomTabsBg,
        minWidth: '100%',
        maxHeight: Dimensions.get('window').height / 5,
      },
    metaContainer: {   
        flex: 1,
        flexDirection: "column",
        maxWidth: '100%',
    },
    buttonContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: 'space-evenly',
      alignItems: 'center',
 
    },
    imageContainer:{

    },
    
    buttonStyle: {
        borderRadius: 10
    },
    defaultText: {
        color: '#FFFFFF',
        textAlign: 'center'
    },
    headerText: {
        color: '#FFFFFF',
        flexWrap: 'wrap',
        fontWeight: '700',
        marginBottom: 5,
        maxHeight: 70,
        fontSize: 13,
        textAlign: 'center'
    },
    image: { 
        width: 72, 
        height: 72,
        marginRight: 20,
        marginBottom: 5, 
    },
  });

const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
    radiocoResponse: state.audioPlayerReducer.liveRadio
  });

export default connect(mapStateToProps)(AudioPlayer)
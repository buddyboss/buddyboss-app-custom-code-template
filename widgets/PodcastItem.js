import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { stripExcerpt } from "../api/utilities";
import { saveFileMp3 } from "../api/fileSystems";

const PodcastItem = (props) => {
    const dispatch = useDispatch()
    const colors = props.theStyle.colors
    //const fonts = props.theStyle.
    const downloadArr = useSelector(state=>state.audioPlayerReducer.downloads)
    const playlistArr = useSelector(state=>state.audioPlayerReducer.playlist)
    const isDownloaded = downloadArr.find(({id}) => id === props.item.id)
    const isPlaylist = playlistArr.find(({id}) => id === props.item.id)
    const [isDownloading, setDownloading] = useState(false)
    const saveFileHandler = (el) => {
        console.log("PODCASTS:SAVEHANDLER: Starting Save...",el)
        setDownloading(true)
        saveFileMp3(el).then((item)=> {
            console.log("PODCASTS:SAVEHANDLER: File Saved, now update State",item)
            setDownloading(false)
            dispatch({
                type: 'LOAD_DOWNLOAD_MP3',
                payload: item
            })
        })
    }

    const playEpisodeHandler = (pod) => {
        dispatch({
            type: 'SET_CURRENT_TRACK',
            payload: pod
        })
    }

    const cueEpisodeHandler = (pod) => {
        console.log("Sending to Cue Transition", playlistArr)
        if (playlistArr.length > 0) {
            dispatch({
                type: 'CUE_TRANS_TRACK',
                payload: pod
            })
        } else {
            dispatch({
                type: 'SET_CURRENT_TRACK',
                payload: pod
            }) 
            dispatch({
                type: 'CUE_TRACK',
                payload: [pod]
            })
        }
    }

    const removeCueEpisodeHandler = (pod) => {
        console.log("PODCASTITEMS:REMOVINGPOD:", pod)
        dispatch({
            type: 'CUE_REMOVE',
            payload: pod
        })
    }

    return(
        <View style={styles(colors).itemContainer}>
            
                <View style={styles(colors).container} key={props.item.id}>
                    <Text style={styles(colors).headerText}>{ props.item.title.rendered }</Text> 
                </View>
            
                <View style={styles(colors).description}>
                    <Text style={styles(colors).defaultText}>{ stripExcerpt( props.item.content.rendered, 550 ) }</Text>
                </View>

                <View style={styles(colors).buttonRow}>
                    
                    <View style={styles(colors).buttonIcon}>
                        <Icon.Button 
                            name="play"
                            backgroundColor={props.theStyle.colors.primaryButtonBg}
                            marginRight={10}
                            iconStyle={{marginRight: 10}}
                            style={styles(colors).icon}
                            onPress={() => playEpisodeHandler( props.item ) }
                        >Play</Icon.Button>
                    </View>
                    {!isPlaylist ?  <View style={styles(colors).buttonIcon}>
                        <Icon.Button 
                            name="plus"
                            backgroundColor={props.theStyle.colors.primaryButtonBg}
                            marginRight={10}
                            iconStyle={{marginRight: 10}}
                            style={styles(colors).icon}
                            onPress={() => cueEpisodeHandler( props.item ) }
                        >Playlist</Icon.Button>
                    </View> : <View style={styles(colors).buttonIcon}>
                        <Icon.Button 
                            name="minus"
                            backgroundColor={props.theStyle.colors.primaryButtonBg}
                            marginRight={10}
                            iconStyle={{marginRight: 10}}
                            style={styles(colors).icon}
                            onPress={() => removeCueEpisodeHandler( props.item ) }
                        >Playlist</Icon.Button>
                    </View>}

                    {!isDownloaded ? <View style={styles(colors).buttonIcon}>
                        {isDownloading ? <Icon.Button 
                            name="download"
                            backgroundColor={props.theStyle.colors.secondaryButtonBg}
                            iconStyle={{marginRight: 10}}
                            style={{backgroundColor: '#000000'}}
                        >Downloading</Icon.Button> :
                            <Icon.Button 
                            name="download"
                            backgroundColor={props.theStyle.colors.primaryButtonBg}
                            iconStyle={{marginRight: 10}}
                            onPress={() => saveFileHandler( props.item ) }
                        >Download</Icon.Button>  }
                    </View>:
                    <View style={styles(colors).buttonIcon}>
                        <Icon.Button 
                            name="check"
                            iconStyle={{marginRight: 10}}
                            color={'#81d742'}
                            style={{backgroundColor: '#000000'}}                        
                        >Downloaded</Icon.Button>
                    </View>
                    }

                    

                </View>
            
        </View>
    )
}

const styles = props => StyleSheet.create({
    itemContainer: {
        marginBottom: 10,
        marginTop: 10,
        borderWidth: 1,
        borderColor: props.borderColor,
        borderRadius: 5,
    },
    container: {
      flex: 1,
      justifyContent: "flex-start",
      flexDirection: "row",
      padding: 20,
      marginBottom: 0,
      minWidth: 200,
      maxHeight: 250,
    },
    description: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    defaultText: {
        color: props.regTextColor,
        flexWrap: 'wrap'
    },
    headerText: {
        color: props.headingsColor,
        flexWrap: 'wrap',
        fontWeight: '700',
        fontFamily: 'Roboto',
        fontSize: 18,
        padding: 0,
    },
    leftCol: {
        maxWidth: 75,
        paddingTop: 10,
    },
    rightCol: {
        flexShrink: 1,
        paddingLeft: 5,
        paddingTop: 0,
    },
    buttonRow: {
      justifyContent: "flex-start",
      flexDirection: "row",
      padding: 10,
      width: '100%'
    },
    icon: {
      marginRight: 10,
    },
    buttonIcon: {
      marginRight: 10,
    }
  });

export default PodcastItem;

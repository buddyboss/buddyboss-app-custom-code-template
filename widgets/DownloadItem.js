import React  from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { stripExcerpt } from "../api/utilities";
import { deleteFile } from "../api/fileSystems";

const DownloadItem = (props) => {
    const dispatch = useDispatch()
    
    const colors = props.theStyle.colors
    console.log("DownloadItem", props)
    const playEpisodeHandler = (pod) => {
        console.log("PLAYHANDLER:", pod)
        const payload = {
            id: pod.id,
            mp3: pod.mp3,
            title: {
                rendered: pod.title
            },
            featured_image_urls: {
                medium: pod.artwork
            }
        }
        console.log("PLAYHANDLER:PAYLOAD", payload)
        /* 
            id: podData.id,
            url: podData.mp3,
            title: podData.title.rendered,
            artwork: podData.featured_image_urls.medium
        */
        dispatch({
            type: 'SET_CURRENT_TRACK',
            payload: payload
        }) 
    }

    const deleteHandler = (file) => {
        
        deleteFile(file).then((data) => {
            console.log("DELETEHANDLER:", data)
            dispatch({
                type: 'LOAD_DOWNLOAD_MP3',
                payload: data
            })
        })
       
    }
    return(
        <View style={styles(colors).itemContainer}>
            
                <View style={styles(colors).container} key={props.item.id}>
                    <Text style={styles(colors).headerText}>{ props.item.title }</Text> 
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

                    <View style={styles(colors).buttonIcon}>
                        <Icon.Button 
                            name="minus-circle"
                            backgroundColor={props.theStyle.colors.primaryButtonBg}
                            iconStyle={{marginRight: 10}}
                            onPress={() => deleteHandler(props.item.mp3) }
                        >Delete</Icon.Button>  
                    </View>
 
                    
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

export default DownloadItem;

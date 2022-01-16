import React, {useEffect, useRef} from "react";
import {View, Text, ScrollView, Button} from "react-native";
import {connect, useDispatch, useSelector} from "react-redux";
import { loadMp3Index, getMp3Index, deleteFile, deleteIndex } from "../api/fileSystems";

const DownloadManager = props => {
    const dispatch = useDispatch()
    const apState = useSelector(state=>state.audioPlayerReducer)
    const index = apState.downloads
    const isReady = apState.isReady
    useEffect(()=>{
        if (index.length === 0) {
            loadMp3Index().then((data)=>{
                const thePayload = JSON.parse(data)
                console.log("UE_DM:", thePayload)
                dispatch({
                    type: 'LOAD_DOWNLOAD_MP3',
                    payload: thePayload
                })
                dispatch({
                    type: 'SET_READY',
                    payload: true
                })
                
            })
        } else {
            dispatch({
                type: 'SET_READY',
                payload: true
            })
        }
        
    },[])

    useEffect(()=>{
        console.log("DOWNLOADMANAGER: Downloads State Updated")
        dispatch({
            type: 'SET_READY',
            payload: true
        })
    }, [index])

    const deleteHandler = (file) => {
        
        deleteFile(file).then((data) => {
            console.log("DELETEHANDLER:", data)
            dispatch({
                type: 'LOAD_DOWNLOAD_MP3',
                payload: data
            })
        })
       
    }

    return(<ScrollView style={{flex: 1, justifyContent: "flex-start", alignItems: "center"}}>
            {isReady && index.map(el => 
                <View>
                    <Text>{el.title}</Text>
                    <Button title="Listen" onPress={ () => props.navigation.navigate('audioplayer', { podData: el })} />
                    <Button title="Delete" onPress={ () => deleteHandler(el.mp3)} />
                </View>
            )}
            <Button title="Delete Index File" onPress={ ()=> deleteIndex()} />
            <Button title="Get MP3 Index" onPress={ ()=> getMp3Index().then((data)=>console.log(data))} />
        </ScrollView>)  
}

export default DownloadManager
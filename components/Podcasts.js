import React, { useEffect, useState } from "react";
import {View, Text, Button, StyleSheet, FlatList, Animated, Dimensions} from "react-native";
import {connect, useDispatch, useSelector} from "react-redux";
import { getPodcastData } from "../api/podcastsApi";
import { getMp3Index } from "../api/fileSystems";

//Components
import AudioPlayer from "../widgets/AudioPlayer";
import PodcastItem from "../widgets/PodcastItem";
import Icon from 'react-native-vector-icons/FontAwesome5';
import DownloadItem from "../widgets/DownloadItem";
import PlaylistItem from "../widgets/PlaylistItem";

const Podcasts = props => {
    const dispatch = useDispatch()
    const podcastArr = useSelector(state=>state.audioPlayerReducer.podcasts)
    const downloadArr = useSelector(state=>state.audioPlayerReducer.downloads)
    const currentTrack = useSelector(state=>state.audioPlayerReducer.currentTrack)
    const playlistArr = useSelector(state=>state.audioPlayerReducer.playlist)
    const playlistTrans = useSelector(state=>state.audioPlayerReducer.playlistTrans)

    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1)
    const [curTab, setCurTab] = useState('podcasts')
    
    const fetchData = () => {
        console.log("PODCASTS.JS FETCH DATA")
        getPodcastData(props.accessToken).then(data =>{
            dispatch({
                type: 'LOAD_PODCAST_DATA',
                payload: data
            })
        })
        setIsFetching(false);
    };

    const onRefresh = () => {
        setIsFetching(true);
        fetchData();
    };
        
    useEffect(()=>{
        console.log("PODCASTS.JS EFFECT")
        //props.navigation.setOptions({title: 'Eat Me'})
        setIsFetching(true)
        getPodcastData(props.accessToken).then(data =>{
            dispatch({
                type: 'LOAD_PODCAST_DATA',
                payload: data
            })
            setIsFetching(false)
        })
        getMp3Index().then((data)=>{
            console.log("IndexAM:", JSON.parse(data))
            dispatch({
                type: 'LOAD_DOWNLOAD_MP3',
                payload: JSON.parse(data)
            })
        })
       
        
    },[])

    useEffect(()=>{   
        console.log("PODCASTS:CUETRACKDISPATCH:", playlistTrans)
        if (playlistTrans) {
            dispatch({
                type: 'CUE_TRACK',
                payload: playlistTrans
            }) 
        }
    }, [playlistTrans])

    useEffect(()=>{
        
        console.log("PODCASTS:PLAYLISTARRAY:", playlistArr)
            
     }, [playlistArr])

    const loadMoreHandler = () => {
        const newPage = page + 1
        setPage(newPage)
        setIsFetching(true)
        getPodcastData(props.accessToken, newPage).then(data =>{
            dispatch({
                type: 'LOAD_PODCAST_DATA',
                payload: data
            })
            setIsFetching(false)
        })
    }

    const styleConfig = props.config.styles

    const renderFooter = () => {
        return (
          //Footer View with Load More button
       <View style={styles(styleConfig.colors).loadButton}>
             {!isFetching && <Icon.Button 
                name="caret-square-down"
                backgroundColor={styleConfig.colors.primaryButtonBg}
                iconStyle={{marginRight: 10}}
                width={150}
                onPress={() => loadMoreHandler() }
            >Load More</Icon.Button>}
        </View>
        );
    };

    const renderItem = ({ item }) => (
        <PodcastItem item={item} theStyle={styleConfig} />
      );

    const renderDownloadItem = ({item}) => (
        <DownloadItem item={item} theStyle={styleConfig} />
    )

    const renderPlaylistItem = ({item}) => (
        <PlaylistItem item={item} theStyle={styleConfig} />
    )

    const renderEmptyItem = () => {
        return(
            <View>
                <Text style={styles(styleConfig).defaultText}>No Items</Text>
            </View>
        )
    }

    
    return(<View style={styles(styleConfig.colors).container}>
            
            {currentTrack && 
            <View style={styles(styleConfig.colors).audioPlayerLarge}>
                <AudioPlayer />
            </View>}
            
            <View style={styles(styleConfig.colors).menuContainer}>
                <View style={styles(styleConfig.colors).menuItem}>
                    <Icon.Button 
                        name="play"
                        style={{backgroundColor: '#000000'}}
                        iconStyle={{marginRight: 5}}
                        fontSize={9}
                        onPress={() => setCurTab('podcasts') }
                    >Podcasts</Icon.Button>
                </View>

                {playlistArr.length > 0 && <View style={styles(styleConfig.colors).menuItem} >
                    <Icon.Button 
                        name="tasks"
                        style={{backgroundColor: '#000000'}}
                        iconStyle={{marginRight: 5}}
                        onPress={() => setCurTab('playlist') }
                    >Playlist</Icon.Button>
                </View>}

                {downloadArr.length > 0 && <View style={styles(styleConfig.colors).menuItem} >
                    <Icon.Button 
                        name="download"
                        style={{backgroundColor: '#000000'}}
                        iconStyle={{marginRight: 5}}
                        onPress={() => setCurTab('downloads') }
                    >Downloads</Icon.Button>
                </View>}

            </View>

            {curTab === 'podcasts' && <FlatList
                data={podcastArr}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                onRefresh={onRefresh}
                refreshing={isFetching}
                progressViewOffset={100}
                style={styles(styleConfig).list}
                ListFooterComponent={renderFooter}
            />}

            {(curTab === 'downloads') && <FlatList
                data={downloadArr}
                renderItem={renderDownloadItem}
                keyExtractor={item => item.id}
                onRefresh={onRefresh}
                refreshing={isFetching}
                progressViewOffset={100}
                style={styles(styleConfig).list}
                ListEmptyComponent={renderEmptyItem}
            />}

            {(curTab === 'playlist') && <FlatList
                data={playlistArr}
                renderItem={renderPlaylistItem}
                keyExtractor={item => item.id}
                onRefresh={onRefresh}
                refreshing={isFetching}
                progressViewOffset={100}
                style={styles(styleConfig).list}
                ListEmptyComponent={renderEmptyItem}
            />}
            
          
        </View> 
    )
}

const styles = (props) => StyleSheet.create({
    list: {
        
    },
    audioPlayerLarge: {
        
    },
    audioPlayerSmall: {
        
    },
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        color: '#FFFFFF',
        minHeight: 50,
        maxWidth: '100%',
    },
    menuItem: {
        flex: 1,
        justifyContent: "center",
        textAlign: 'center',
        maxWidth: Dimensions.get("window").width / 3,
        marginRight: 5,
    },
    menuText: {
        color: '#FFFFFF',
    },
    loadButton: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 50,
        marginTop: 20,
        maxWidth: 200
    },
    container: {
        flex: 1,
        padding: 10, 
        justifyContent: "flex-start", 
        alignItems: "center", 
        backgroundColor: props.regBgColor, 
        color: props.regTextColor,
    },
    defaultText: {
        color: '#FFFFFF',
        flexWrap: 'wrap'
    },
    headerText: {
        color: '#FFFFFF',
        flexWrap: 'wrap',
        fontWeight: '700'
    },
   
  });

const mapStateToProps = (state) => ({
    config: state.config,  // not needed if axios or fetch is used
    accessToken: state.auth.token,
  });
    
export default connect(mapStateToProps)(Podcasts);
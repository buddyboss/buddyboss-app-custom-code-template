
import Podcasts from "./components/Podcasts";

export const applyCustomCode = externalCodeSetup => {
 Podcasts.navigationOptions = {
    header: null
  }
 // Podcast List
 externalCodeSetup.navigationApi.addNavigationRoute(
  "podcasts",
  "PodcastsScreen",
  Podcasts,
  "All"
);

externalCodeSetup.navigationApi.addNavigationRoute(
  "podcasts",
  "PodcastsScreen",
  Podcasts,
  "Main"
);

// REDUCERS
/* Track Object: 
    {  
      id: null,
      title: null,
      artwork: null,
      mp3: null
    } 
*/
const audioPlayer = {
  liveRadio: {},
  currentTrack: null,
  currentPosition: 0,
  podcasts: [],
  downloads: [],
  playlist: [],
  playlistTrans: null,
  isReady: false,
};
 
 externalCodeSetup.reduxApi.addReducer(
  "audioPlayerReducer",
  (state = audioPlayer, action) => {

    if (action.type === "SET_RADIO_DATA") {
      console.log("APR: Live Radio", action.payload)
      return {...state, liveRadio: action.payload};
    
    } else if (action.type === "SET_CURRENT_TRACK") {
      console.log("APR: Current Track", action.payload)
      return {...state, currentTrack: action.payload};
    
    } else if (action.type==='LOAD_PODCAST_DATA') {
      console.log("APR API:", action.payload)
      const currentArr = state.podcasts
      const newArr = currentArr.concat(action.payload)
      return {...state, podcasts: newArr}

    } else if (action.type==='LOAD_DOWNLOAD_MP3') {
      console.log("APR: DOWNLOADS", action.payload)
      return {...state, downloads: action.payload}

    } else if (action.type==='SET_READY') {
      console.log("APR: IS READY:", action.payload)
      return {...state, isReady: action.payload}

    } else if (action.type==='SET_POSITION') {
      return {...state, currentPosition: action.payload.position}

    } else if (action.type==='CUE_TRACK') {
      const currentArr = state.playlist
      const payload = action.payload
      const isPlaylist = currentArr.find(({id}) => id === payload.id)
      console.log("APR:ISFOUND:", isPlaylist)
      const newArr = !isPlaylist ? currentArr.concat(action.payload) : currentArr
      return {...state, playlist: newArr}

    } else if (action.type==='CUE_TRANS_TRACK') {
      console.log("APR:CUETRANSTRACK:", action.payload)
      return {...state, playlistTrans: action.payload}

    } else if (action.type==='CUE_REMOVE') {
      const playlist = state.playlist
      const newArr = playlist.filter(item => item !== action.payload)

      console.log("APR:REMOVECUE:", newArr)
      return {...state, playlist: newArr}

    } else {
      return state;
    }
  }
 );
}
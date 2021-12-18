import AudioPlayer from "./components/AudioPlayer";
import Podcasts from "./components/Podcasts";
import Podcast from "./components/single/Podcast";

export const applyCustomCode = externalCodeSetup => {
 // Audio Player
 externalCodeSetup.navigationApi.addNavigationRoute(
   "audioplayer",
   "AudioPlayerScreen",
   AudioPlayer,
   "All"
 );
 externalCodeSetup.navigationApi.addNavigationRoute(
  "audioplayer",
  "AudioPlayerScreen",
   AudioPlayer,
   "Main"
 );
 
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

// Podcast Singleton
externalCodeSetup.navigationApi.addNavigationRoute(
  "podcast",
  "PodcastScreen",
  Podcast,
  "All"
);


// REDUCERS
 const audioPlayer = {
   liveRadio: {},
   currentTrack: {
     id: 'trackid',
     url: null,
     title: '',
     artist: '',
     artwork: '',
   },
   podcasts: [],
  };

 externalCodeSetup.reduxApi.addReducer(
  "audioPlayerReducer",
  (state = audioPlayer, action) => {
    if (action.type === "SET_RADIO_DATA") {
      console.log("Live Radio", action.payload)
      return {...state, liveRadio: action.payload};
    } else if (action.type === "SET_CURRENT_TRACK") {
      console.log("Current Track", action.payload)
      return {...state, currentTrack: action.payload};
    } else if (action.type==='LOAD_PODCAST_DATA') {
      
      console.log("API:", action.payload)
      return {...state, podcasts: action.payload}
    } 
    else {
      return state;
    }
  }
 );

}
/**
 * Contains the example MapView created in the IOS project
 * This file is intended to show you a simple example of how to import and use custom native modules
 */

import {requireNativeComponent} from "react-native";

module.exports = requireNativeComponent("RNTMap");

/**
 *  Now Map component can be imported in index hook file...
 *
 * // index.js
 * import RNTMap from "./src/nativeModules/MapViewIOS";
 *
 * ... and used in the same way as a normal react component
 *
 * <RNTMap style={{flex: 1}} />
 *
 */

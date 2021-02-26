/**
 * Contains the example MapView created in the Android project
 * This file is intended to show you a simple example of how to import and use custom native modules
 */

import {requireNativeComponent} from "react-native";

module.exports = requireNativeComponent("RCTViewExample");

/**
 *  Now Map component can be imported in index hook file...
 *
 * // index.js
 * import RCTAndroidView from "./src/nativeModules/ViewAndroid";
 *
 * ... and used in the same way as a normal react component
 *
 * <RCTAndroidView style={{flex: 1, backgroundColor: "red"}} />
 *
 */

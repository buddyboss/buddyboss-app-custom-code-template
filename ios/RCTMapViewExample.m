//
//  MapViewExample.m
//  RNCustomCode
//
//  Created by Morgan Trudeau on 2020-05-13.
//  Copyright © 2020 Facebook. All rights reserved.
//

/*
 This is an example of a native component that can be used in react-native
 For more information visit: https://reactnative.dev/docs/native-components-ios
*/

#import <MapKit/MapKit.h>
#import <React/RCTViewManager.h>

@interface RNTMapManager : RCTViewManager
@end

@implementation RNTMapManager

RCT_EXPORT_MODULE(RNTMap)

- (UIView *)view
{
  return [[MKMapView alloc] init];
}

@end


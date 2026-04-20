#import "BuddybossCustomCode.h"
#import <React/RCTRootView.h>
#import <RNBuddybossCustomCodeSpec/RNBuddybossCustomCodeSpec.h>

@interface BuddybossCustomCode () <NativeBuddybossCustomCodeSpec>
@end

@implementation BuddybossCustomCode

// Lifecycle methods (DO NOT DELETE)
// These methods will be called in the BuddyBoss app's AppDelegate.m
// You can hook into them to initiate your native libraries or run any custom side-effects

// Called inside AppDelegate.m didFinishLaunchingWithOptions method. This should be used to init most native libraries.
+ (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions withBridge:(RCTBridge *)bridge
{}

// Called inside AppDelegate.m didFinishLaunchingWithOptions method when rootView is attached to window
+ (void)rootViewVisible:(RCTRootView *)rootView
{}

// Here you can write your own custom native modules to use in your custom repo
// Below is an example of a simple method to multiply two numbers
// See https://reactnative.dev/docs/the-new-architecture/pure-cxx-modules for more information

RCT_EXPORT_MODULE()

- (void)multiply:(double)a
               b:(double)b
         resolve:(RCTPromiseResolveBlock)resolve
          reject:(RCTPromiseRejectBlock)reject
{
    resolve(@(a * b));
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeBuddybossCustomCodeSpecJSI>(params);
}

@end

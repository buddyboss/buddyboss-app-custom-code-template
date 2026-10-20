#import "BuddybossCustomCode.h"
#import <RNBuddybossCustomCodeSpec/RNBuddybossCustomCodeSpec.h>

@interface BuddybossCustomCode () <NativeBuddybossCustomCodeSpec>
@end

@implementation BuddybossCustomCode

// Lifecycle methods (DO NOT DELETE)
// These methods will be called in the BuddyBoss app's AppDelegate.m
// You can hook into them to initiate your native libraries or run any custom side-effects

// Called inside AppDelegate.m didFinishLaunchingWithOptions method. This should be used to init most native libraries.
+ (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{}

// Called once the React Native root view is attached to the window. On the New Architecture
// this is an RCTSurfaceHostingProxyRootView, so it is typed as a plain UIView.
+ (void)rootViewVisible:(UIView *)rootView
{}

RCT_EXPORT_MODULE()

// ---------------------------------------------------------------------
// Native methods exposed to JS.
// Signatures must match the TS spec (codegen will fail the build otherwise).
// ---------------------------------------------------------------------

// Add your native methods here.

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeBuddybossCustomCodeSpecJSI>(params);
}

@end

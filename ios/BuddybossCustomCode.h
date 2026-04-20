#import <React/RCTBridgeModule.h>
#import <React/RCTRootView.h>
#import <RNBuddybossCustomCodeSpec/RNBuddybossCustomCodeSpec.h>

@interface BuddybossCustomCode : NSObject <NativeBuddybossCustomCodeSpec>

+ (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions withBridge:(RCTBridge *)bridge;
+ (void)rootViewVisible:(RCTRootView *)rootView;

@end

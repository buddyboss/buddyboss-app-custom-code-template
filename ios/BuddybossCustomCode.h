#import <React/RCTBridgeModule.h>
#import <React/RCTRootView.h>

@interface BuddybossCustomCode : NSObject <RCTBridgeModule>

+ (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions withBridge:(RCTBridge *)bridge;
+ (void)rootViewVisible:(RCTRootView *)rootView;

@end

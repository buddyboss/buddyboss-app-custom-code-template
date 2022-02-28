#import <React/RCTBridgeModule.h>

/**
 This file contains AppDelegate methods that can be hooked into
 If a method does not appear here that is needed for your native integration BuddyBoss can add support
 */

@interface AppbossCustomCode : NSObject <RCTBridgeModule>

+ (void)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions;
+ (void)setup;

@end

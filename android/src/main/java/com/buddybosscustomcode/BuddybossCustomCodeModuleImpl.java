package com.buddybosscustomcode;

import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Promise;

import java.util.List;

public class BuddybossCustomCodeModuleImpl {
    public static final String NAME = "BuddybossCustomCode";

    // Lifecycle methods (DO NOT DELETE)
    // These methods will be called in the BuddyBoss app's MainApplication.java and MainActivity.java
    // You can hook into them to initiate your native libraries or run any custom side-effects

    public static void onCreateApplication(Application application) {}

    public static void onCreateActivity(Activity activity, Bundle savedInstanceState) {}

    public static void onStart(Activity activity) {}

    public static void onNewIntent(Activity activity, Intent intent) {}

    public static void getPackages(List<ReactPackage> packages) {}

    // Here you can write your own custom native modules to use in your custom repo
    // Below is an example of a simple method to multiply two numbers
    // See https://reactnative.dev/docs/the-new-architecture/pure-cxx-modules for more information

    public static void multiply(double a, double b, Promise promise) {
        promise.resolve(a * b);
    }
}

package com.buddybosscustomcode;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import android.content.Intent;
import android.os.Bundle;
import android.app.Activity;
import android.app.Application;
import com.facebook.react.ReactPackage;
import java.util.List;

@ReactModule(name = BuddybossCustomCodeModule.NAME)
public class BuddybossCustomCodeModule extends ReactContextBaseJavaModule {
    public static final String NAME = "BuddybossCustomCode";

    public BuddybossCustomCodeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

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
    // See https://reactnative.dev/docs/native-modules-android for more information

    @ReactMethod
    public void multiply(int a, int b, Promise promise) {
        promise.resolve(a * b);
    }

    public static native int nativeMultiply(int a, int b);
}

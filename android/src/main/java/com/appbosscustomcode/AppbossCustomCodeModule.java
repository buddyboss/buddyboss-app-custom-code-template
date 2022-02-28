package com.appbosscustomcode;

import androidx.annotation.NonNull;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.module.annotations.ReactModule;
import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;

@ReactModule(name = AppbossCustomCodeModule.NAME)
public class AppbossCustomCodeModule extends ReactContextBaseJavaModule {
    // Lifecycle methods (DO NOT DELETE)
    // These methods will be called in the BuddyBoss app's MainApplication.java and MainActivity.java
    // You can hook into them to initiate your native libraries or run any custom side-effects

    public void onCreateApplication() {}

    public void onCreateActivity(Bundle savedInstanceState) {}

    public void onStart() {}

    public void onNewIntent(Intent intent) {}


    // Here you can write your own custom native modules to use in your custom repo
    // Below is an example of a simple method to multiply two numbers
    // See https://reactnative.dev/docs/native-modules-android for more information

    public static final String NAME = "AppbossCustomCode";

    public AppbossCustomCodeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    // This example method can be deleted
    @ReactMethod
    public void multiply(int a, int b, Promise promise) {
        promise.resolve(a * b);
    }

    public static native int nativeMultiply(int a, int b);

}

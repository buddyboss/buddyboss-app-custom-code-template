package com.buddybosscustomcode;

import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.os.Bundle;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;

import java.util.List;

@ReactModule(name = BuddybossCustomCodeModule.NAME)
public class BuddybossCustomCodeModule extends NativeBuddybossCustomCodeSpec {
    public static final String NAME = BuddybossCustomCodeModuleImpl.NAME;

    public BuddybossCustomCodeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    // Lifecycle methods (DO NOT DELETE)
    public static void onCreateApplication(Application application) {
        BuddybossCustomCodeModuleImpl.onCreateApplication(application);
    }

    public static void onCreateActivity(Activity activity, Bundle savedInstanceState) {
        BuddybossCustomCodeModuleImpl.onCreateActivity(activity, savedInstanceState);
    }

    public static void onStart(Activity activity) {
        BuddybossCustomCodeModuleImpl.onStart(activity);
    }

    public static void onNewIntent(Activity activity, Intent intent) {
        BuddybossCustomCodeModuleImpl.onNewIntent(activity, intent);
    }

    public static void getPackages(List<ReactPackage> packages) {
        BuddybossCustomCodeModuleImpl.getPackages(packages);
    }

    @Override
    public void multiply(double a, double b, Promise promise) {
        BuddybossCustomCodeModuleImpl.multiply(a, b, promise);
    }
}

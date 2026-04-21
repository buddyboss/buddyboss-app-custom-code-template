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
    public static final String NAME = "BuddybossCustomCode";

    public BuddybossCustomCodeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    // ---------------------------------------------------------------------
    // Lifecycle hooks (DO NOT DELETE)
    // Called from the BuddyBoss app's MainApplication.java / MainActivity.java.
    // Use them to initialise native libraries or run custom side-effects.
    // ---------------------------------------------------------------------

    public static void onCreateApplication(Application application) {}

    public static void onCreateActivity(Activity activity, Bundle savedInstanceState) {}

    public static void onStart(Activity activity) {}

    public static void onNewIntent(Activity activity, Intent intent) {}

    public static void getPackages(List<ReactPackage> packages) {}

    // ---------------------------------------------------------------------
    // Native methods exposed to JS.
    // Signatures must match the TS spec (codegen will fail the build otherwise).
    // ---------------------------------------------------------------------

    // Add your native methods here.
}

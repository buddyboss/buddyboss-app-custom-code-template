package com.buddybosscustomcode;

import androidx.annotation.NonNull;

import com.facebook.react.BaseReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;

import java.util.HashMap;
import java.util.Map;

public class BuddybossCustomCodePackage extends BaseReactPackage {
    @Override
    public NativeModule getModule(@NonNull String name, @NonNull ReactApplicationContext reactContext) {
        if (name.equals(BuddybossCustomCodeModule.NAME)) {
            return new BuddybossCustomCodeModule(reactContext);
        }
        return null;
    }

    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return () -> {
            Map<String, ReactModuleInfo> map = new HashMap<>();
            map.put(
                BuddybossCustomCodeModule.NAME,
                new ReactModuleInfo(
                    BuddybossCustomCodeModule.NAME, // name
                    BuddybossCustomCodeModule.NAME, // className
                    false, // canOverrideExistingModule
                    false, // needsEagerInit
                    false, // isCxxModule
                    true // isTurboModule
                )
            );
            return map;
        };
    }
}

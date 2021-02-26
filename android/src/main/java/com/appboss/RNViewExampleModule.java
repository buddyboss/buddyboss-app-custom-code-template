// This file contains an example of a custom native module
// To create a new module create a new module file and export in RNCustomCodePackage.java
// For more information visit https://reactnative.dev/docs/native-components-android

package com.appboss;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.views.view.ReactViewGroup;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ImageResizeMode;
import com.facebook.react.uimanager.ThemedReactContext;
import android.widget.LinearLayout;
import android.content.Context;

public class RNViewExampleModule extends SimpleViewManager<CustomView> {

  public static final String REACT_CLASS = "RCTViewExample";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected CustomView createViewInstance(ThemedReactContext context){
      return new CustomView(context);
  }

}

class CustomView extends LinearLayout {
    public CustomView(Context context) {
        super(context);
        init();
    }
    public void init() {
        inflate(getContext(), R.layout.custom_layout, this);
    }
}

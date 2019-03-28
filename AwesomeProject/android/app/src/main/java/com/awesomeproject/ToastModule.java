// ToastModule.java
package com.awesomeproject;

import android.util.Log;
import android.widget.Toast;
import android.widget.ImageView;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.*;
import android.graphics.Bitmap;
import java.util.Map;
import java.util.HashMap;

public class ToastModule extends ReactContextBaseJavaModule {

    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ToastExample";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration) throws IOException {
        Log.d("NOOTCUTE", message);

        ImageSplitTest image = new ImageSplitTest();
        Bitmap imgs[] = image.split(message);
        // Toast.makeText(getReactApplicationContext(), message, duration).show();
        ImageView view = new ImageView(getReactApplicationContext());
        Toast t = new Toast(getReactApplicationContext());
        // Log.d("NOOTCUTE", Integer.toString(imgs.length));
        view.setImageBitmap(imgs[1]);
        t.setView(view);
        t.show();
    }
}

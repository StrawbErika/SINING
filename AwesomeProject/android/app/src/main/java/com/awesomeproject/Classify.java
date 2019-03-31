// ToastModule.java
package com.awesomeproject;

import android.util.Log;
import android.widget.Toast;
import android.widget.ImageView;
import android.content.res.AssetManager;
import android.graphics.Color;
import android.graphics.Bitmap;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.uimanager.IllegalViewOperationException;

import org.tensorflow.contrib.android.TensorFlowInferenceInterface;

import java.io.*;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;
import java.util.Arrays;

public class Classify extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;
    private ArrayList<String> artistClasses;
    private TensorFlowInferenceInterface inferenceInterface;
    private final String modelName = "output_graph.pb";
    private final String input = "Placeholder";
    private final String output = "final_result";
    private final int numClasses = 4;
    private final int inputSize = 250;
    private float[] predictValues;

    public Classify(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "Classify";
    }

    @ReactMethod
    public void classify(String message, Promise promise) throws IOException, IllegalViewOperationException {
        try {
            ImageSplitTest image = new ImageSplitTest();
            Bitmap imgs[] = image.split(message);
            ArrayList<String> topArtist = new ArrayList<String>();
            this.readLabel();
            int cnt = 0;
            long startTime = System.currentTimeMillis();
            while (cnt != imgs.length) {
                this.recognizeImage(imgs[cnt]);
                topArtist.add(this.initResultsView());
                cnt = cnt + 1;
            }
            long endTime = System.currentTimeMillis();
            Log.d("NOOTCUTE", "Time to predict: " + (endTime - startTime) + "milliseconds");
            Log.d("NOOTCUTE", countArtists(topArtist));
            String output = countArtists(topArtist);
            promise.resolve(output);
        } catch (IllegalViewOperationException e) {
            promise.reject("E_LAYOUT_ERROR", e);
        }
    }

    public void readLabel() {
        artistClasses = new ArrayList<String>();
        BufferedReader br = null;

        try {
            br = new BufferedReader(new InputStreamReader(reactContext.getAssets().open("output_labels.txt")));
            String line;
            while ((line = br.readLine()) != null) {
                artistClasses.add(line);
            }
        } catch (IOException e) {
            Log.d("NOOTCUTE", e.toString(), new RuntimeException());
        }
    }

    public static String countArtists(ArrayList<String> art) {
        ArrayList<String> artCopy = art;
        int cnt = 0;
        int a = 0;
        int c = 0;
        int f = 0;
        int l = 0;
        while (cnt != artCopy.size()) {
            switch (artCopy.get(cnt)) {
            case "amorsolo":
                a = a + 1;
                break;
            case "cabrera":
                c = c + 1;
                break;
            case "francisco":
                f = f + 1;
                break;
            case "luna":
                l = l + 1;
                break;
            }
            cnt = cnt + 1;
        }
        ArrayList<Integer> artists = new ArrayList<Integer>();
        artists.add(a);
        artists.add(c);
        artists.add(f);
        artists.add(l);
        String output = topArtist(artists);
        return output;
    }

    public static String topArtist(ArrayList<Integer> artists) {
        int max = artists.get(0);
        int index = 0;
        int cnt = 1;
        String artist = null;
        while (cnt != artists.size()) {
            if (artists.get(cnt) > max) {
                max = artists.get(cnt);
                index = cnt;
            }
            cnt = cnt + 1;
        }
        switch (index) {
        case 0:
            artist = "amorsolo";
            break;
        case 1:
            artist = "cabrera";
            break;
        case 2:
            artist = "francisco";
            break;
        case 3:
            artist = "luna";
            break;
        }
        return artist;
    }

    public void recognizeImage(Bitmap croppedBmp) { //
        Bitmap scaledBmp = Bitmap.createScaledBitmap(croppedBmp, inputSize, inputSize, false);
        int[] intValues = new int[inputSize * inputSize];
        float[] floatValues = new float[inputSize * inputSize * 3];
        float[] outputs = new float[numClasses];

        try {
            inferenceInterface = new TensorFlowInferenceInterface(reactContext.getAssets().open(modelName));
        } catch (IOException e) {
            Log.d("NOOTCUTE", e.toString(), new RuntimeException());
        }
        scaledBmp.getPixels(intValues, 0, scaledBmp.getWidth(), 0, 0, scaledBmp.getWidth(), scaledBmp.getHeight());

        for (int i = 0; i < intValues.length; i += 1) {
            final int val = intValues[i];
            floatValues[i * 3 + 2] = Color.red(val) / 255.0f;
            floatValues[i * 3 + 1] = Color.green(val) / 255.0f;
            floatValues[i * 3 + 0] = Color.blue(val) / 255.0f;
        }

        inferenceInterface.feed(input, floatValues, 1, inputSize, inputSize, 3);

        inferenceInterface.run(new String[] { output });

        inferenceInterface.fetch(output, outputs);

        predictValues = null;
        predictValues = outputs.clone();

    }

    public String initResultsView() { //

        Float[] predictValuesObj = new Float[predictValues.length];

        for (int i = 0; i < predictValues.length; i += 1) {
            predictValuesObj[i] = predictValues[i];
        }

        float[] sortedPredictions = predictValues.clone();
        Arrays.sort(sortedPredictions);

        float[] topPredictions = Arrays.copyOfRange(sortedPredictions, sortedPredictions.length - 4,
                sortedPredictions.length);

        int[] topPredictionsIndices = new int[4];

        for (int i = 0; i < 4; i += 1) {
            topPredictionsIndices[i] = Arrays.asList(predictValuesObj).indexOf(topPredictions[i]);
        }

        final String topPrediction2 = artistClasses.get(topPredictionsIndices[3]);
        final String topPrediction3 = artistClasses.get(topPredictionsIndices[2]);
        final String topPrediction4 = artistClasses.get(topPredictionsIndices[1]);
        final String topPrediction5 = artistClasses.get(topPredictionsIndices[0]);

        final String prob2 = String.valueOf(sortedPredictions[3]);
        final String prob3 = String.valueOf(sortedPredictions[2]);
        final String prob4 = String.valueOf(sortedPredictions[1]);
        final String prob5 = String.valueOf(sortedPredictions[0]);

        final double prog2 = sortedPredictions[3] * 100;
        final double prog3 = sortedPredictions[2] * 100;
        final double prog4 = sortedPredictions[1] * 100;
        final double prog5 = sortedPredictions[0] * 100;

        Log.d("NOOTCUTE", topPrediction2);

        return topPrediction2;
    }
}
// 0 3 6
// 1 4 7
// 2 5 8

// ToastModule.java
package com.awesomeproject;

import android.util.Log;
import android.widget.Toast;
import android.widget.ImageView;
import android.content.res.AssetManager;
import android.graphics.Color;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.tensorflow.contrib.android.TensorFlowInferenceInterface;

import java.io.*;
import android.graphics.Bitmap;
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
    public void classify(String message) throws IOException {
        ImageSplitTest image = new ImageSplitTest();
        Bitmap imgs[] = image.split(message);
        this.readLabel();
        int cnt = 0;
        while (cnt != imgs.length) {
            this.recognizeImage(imgs[cnt]);
            this.initResultsView();
            Log.d("NOOTCUTE", "NEXT");
            cnt = cnt + 1;
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

    public void initResultsView() { //

        Float[] predictValuesObj = new Float[predictValues.length];

        for (int i = 0; i < predictValues.length; i += 1) {
            predictValuesObj[i] = predictValues[i];
        }

        float[] sortedPredictions = predictValues.clone();
        Arrays.sort(sortedPredictions);

        float[] topPredictions = Arrays.copyOfRange(sortedPredictions, sortedPredictions.length - 4,
                sortedPredictions.length);
        // sortedPredictions = null;

        int[] topPredictionsIndices = new int[4];

        for (int i = 0; i < 4; i += 1) {
            topPredictionsIndices[i] = Arrays.asList(predictValuesObj).indexOf(topPredictions[i]);
        }

        // final int topPredictionIndex = topPredictionsIndices[3];

        // final String topPrediction1 =artistClasses.get(topPredictionsIndices[4]);
        final String topPrediction2 = artistClasses.get(topPredictionsIndices[3]);
        final String topPrediction3 = artistClasses.get(topPredictionsIndices[2]);
        final String topPrediction4 = artistClasses.get(topPredictionsIndices[1]);
        final String topPrediction5 = artistClasses.get(topPredictionsIndices[0]);

        // final String prob1 = String.valueOf(sortedPredictions[4]);
        final String prob2 = String.valueOf(sortedPredictions[3]);
        final String prob3 = String.valueOf(sortedPredictions[2]);
        final String prob4 = String.valueOf(sortedPredictions[1]);
        final String prob5 = String.valueOf(sortedPredictions[0]);

        // final double prog1 = sortedPredictions[4] * 100;
        final double prog2 = sortedPredictions[3] * 100;
        final double prog3 = sortedPredictions[2] * 100;
        final double prog4 = sortedPredictions[1] * 100;
        final double prog5 = sortedPredictions[0] * 100;

        Log.d("NOOTCUTE", "prog2: " + Double.toString(prog2));
        Log.d("NOOTCUTE", " prog3: " + Double.toString(prog3));
        Log.d("NOOTCUTE", " prog4: " + Double.toString(prog4));
        Log.d("NOOTCUTE", " prog5: " + Double.toString(prog5));

    }
}

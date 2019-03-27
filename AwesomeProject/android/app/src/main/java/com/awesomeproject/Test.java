package com.awesomeproject;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.ImageFormat;
import android.graphics.Matrix;
import android.graphics.SurfaceTexture;
import android.graphics.drawable.BitmapDrawable;
import android.media.Image;
import android.media.ImageReader;
import android.os.AsyncTask;
import android.os.Environment;
import android.os.Handler;
import android.os.HandlerThread;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.InputType;
import android.util.Log;
import android.util.Size;
import android.util.SparseIntArray;
import android.view.Surface;
import android.view.TextureView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.SeekBar;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ViewFlipper;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileReader;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.IntStream;

import org.tensorflow.contrib.android.TensorFlowInferenceInterface; //IMPORTANT -----------------------------------------------------------

/**
 *
 */
public class Test extends AppCompatActivity {
    public Test() {
    }

    private static final String TAG = "MainActivity";

    // Constant params for TensorFlowInferenceInterface //
    // IMPORTANT----------------------------------------------------------------------------------
    private static final String MODEL_FILENAME = "output_graph.pb";
    private static final String LABEL_FILENAME = "output_labels.txt";
    private static final String INPUT_NODE = "conv2d_1_input";
    private static final String OUTPUT_NODE = "dense_3/Softmax";
    private static final int NUM_CLASSES = 4;
    private static final int INPUT_SIZE = 250;

    private static ArrayList<String> PLANT_CLASSES;

    private TensorFlowInferenceInterface inferenceInterface;

    static {
        System.loadLibrary("tensorflow_inference"); // IMPORTANT ----------------------------------------
    }

    // Used to flip/switch between the layouts
    private ViewFlipper viewFlipper;

    // Layouts used for several views in one activity
    private RelativeLayout mainLayout;

    // pre-allocated variables for the views in the mainLayout
    private SeekBar seekbar;
    private Button btnCapture;
    private TextureView textureView;

    // pre-allocated variables for camera
    private String cameraId;
    private Size imageDimension;

    private File file;

    // pre-allocated variables for handling the camera thread
    private Handler mBackgroundHandler;
    private HandlerThread mBackgroundHandlerThread;

    // pre-allocated variables for the views in resultLayout
    private ImageView resultsView;
    private Spinner spnrClassNames;
    private LinearLayout predictionsLayout;

    private TextView predictClass1;
    private TextView predictProb1;
    private ProgressBar predictProg1;

    private TextView predictClass2;
    private TextView predictProb2;
    private ProgressBar predictProg2;

    private TextView predictClass3;
    private TextView predictProb3;
    private ProgressBar predictProg3;

    private TextView predictClass4;
    private TextView predictProb4;
    private ProgressBar predictProg4;

    private TextView predictClass5;
    private TextView predictProb5;
    private ProgressBar predictProg5;

    private Button btnSave;
    private Button btnClear;

    // pre-allocated variables for the image/bmp to be classified and/or saved

    private float[] predictValues;

    /**
     * initializes the pre-allocated variables
     */
    public void init() {
        PLANT_CLASSES = new ArrayList<String>();
        BufferedReader br = null;

        Log.d("NOOTCUTE", "hello");
        try {
            br = new BufferedReader(
                    new InputStreamReader(getReactApplicationContext().getAssets().open(LABEL_FILENAME)));
            String line;
            while ((line = br.readLine()) != null) {
                Log.d("NOOTCUTE", line);
                PLANT_CLASSES.add(line);
            }
        } catch (IOException e) {
            Log.d("NOOTCUTE", e.toString(), new RuntimeException());
        }

    }

    /**
     * Recognize/Classifies the image taken
     */
    public void recognizeImage(Bitmap croppedBmp) { // IMPORTANT------------------------------------------------------------------------------------
        Bitmap scaledBmp = Bitmap.createScaledBitmap(croppedBmp, INPUT_SIZE, INPUT_SIZE, false);
        int[] intValues = new int[INPUT_SIZE * INPUT_SIZE];
        float[] floatValues = new float[INPUT_SIZE * INPUT_SIZE * 3];
        float[] outputs = new float[NUM_CLASSES];

        inferenceInterface = new TensorFlowInferenceInterface(getAssets(), MODEL_FILENAME);

        scaledBmp.getPixels(intValues, 0, scaledBmp.getWidth(), 0, 0, scaledBmp.getWidth(), scaledBmp.getHeight());

        for (int i = 0; i < intValues.length; i += 1) {
            final int val = intValues[i];
            floatValues[i * 3 + 2] = Color.red(val) / 255.0f;
            floatValues[i * 3 + 1] = Color.green(val) / 255.0f;
            floatValues[i * 3 + 0] = Color.blue(val) / 255.0f;
        }

        inferenceInterface.feed(INPUT_NODE, floatValues, 1, INPUT_SIZE, INPUT_SIZE, 3);

        inferenceInterface.run(new String[] { OUTPUT_NODE });

        inferenceInterface.fetch(OUTPUT_NODE, outputs);

        predictValues = null;
        predictValues = outputs.clone();

        initResultsView();
    }

    public void initResultsView() { // IMPORTANT-----------------------------------------------------------------------------------------------------

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

        final int topPredictionIndex = topPredictionsIndices[3];

        // final String topPrediction1 = PLANT_CLASSES.get(topPredictionsIndices[4]);
        final String topPrediction2 = PLANT_CLASSES.get(topPredictionsIndices[3]);
        final String topPrediction3 = PLANT_CLASSES.get(topPredictionsIndices[2]);
        final String topPrediction4 = PLANT_CLASSES.get(topPredictionsIndices[1]);
        final String topPrediction5 = PLANT_CLASSES.get(topPredictionsIndices[0]);

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

        Log.d("NOOTCUTE", "topPredictionIndex: " + Integer.toString(topPredictionIndex));
        // Log.d("NOOTCUTE", "topPrediction1: " + topPrediction1 + " prob1: "+ prob1+ "
        // prog1: "+ Double.toString(prog1);
        Log.d("NOOTCUTE",
                "topPrediction2: " + topPrediction2 + " prob2: " + prob2 + " prog2: " + Double.toString(prog2));
        Log.d("NOOTCUTE",
                "topPrediction3: " + topPrediction3 + " prob3: " + prob3 + " prog3: " + Double.toString(prog3));
        Log.d("NOOTCUTE",
                "topPrediction4: " + topPrediction4 + " prob4: " + prob4 + " prog4: " + Double.toString(prog4));
    }

}

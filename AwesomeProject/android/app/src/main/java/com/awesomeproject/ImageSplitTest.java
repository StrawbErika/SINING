package com.awesomeproject;

import android.util.Log;
import java.io.*;
import java.util.ArrayList; // import the ArrayList class
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

public class ImageSplitTest {
    public ImageSplitTest() {
    }

    public static Bitmap[] split(String fileName) throws IOException {
        Log.d("NOOTCUTE", fileName);
        Log.d("NOOTCUTE", fileName.split("file://")[1]);

        Bitmap image = BitmapFactory.decodeFile(fileName.split("file://")[1]);

        int rows = 3; // You should decide the values for rows and cols variables
        int cols = 3;
        int chunks = rows * cols;

        int count = 0;
        Bitmap imgs[] = new Bitmap[chunks]; // Image array to hold image chunks

        int square = 0;
        System.out.println(image.getWidth());

        if (image.getWidth() > image.getHeight()) {
            square = image.getHeight();
        } else {
            square = image.getWidth();
        }
        int chunkWidth = square / cols; // determines the chunk width and height
        int chunkHeight = square / rows;

        Bitmap croppedImage = image.createBitmap(image, image.getWidth() - square, image.getHeight() - square, square,
                square);
        for (int x = 0; x < rows; x++) {
            for (int y = 0; y < cols; y++) {

                imgs[count] = croppedImage.createBitmap(croppedImage, x * chunkWidth, y * chunkHeight, chunkWidth,
                        chunkHeight); // double
                count = count + 1;
            }
        }
        return imgs;
    }
}
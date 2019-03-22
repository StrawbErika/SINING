import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.awt.*;
import java.util.ArrayList; // import the ArrayList class

public class ImageSplitTest {
    public ImageSplitTest() {
    }

    public BufferedImage[] splitImage(String file) throws IOException {
        FileInputStream fis = new FileInputStream(file);
        BufferedImage image = ImageIO.read(fis); // reading the image file

        int rows = 3; // You should decide the values for rows and cols variables
        int cols = 3;
        int chunks = rows * cols;

        int count = 0;
        BufferedImage imgs[] = new BufferedImage[chunks]; // Image array to hold image chunks

        int square = 0;
        if (image.getWidth() > image.getHeight()) {
            square = image.getHeight();
        } else {
            square = image.getWidth();
        }
        int chunkWidth = square / cols; // determines the chunk width and height
        int chunkHeight = square / rows;

        BufferedImage croppedImage = image.getSubimage(image.getWidth() - square, image.getHeight() - square, square,
                square);
        for (int x = 0; x < rows; x++) {
            for (int y = 0; y < cols; y++) {
                imgs[count] = new BufferedImage(chunkWidth, chunkHeight, croppedImage.getType());
                Graphics2D gr = imgs[count++].createGraphics();
                gr.drawImage(croppedImage, 0, 0, chunkWidth, chunkHeight, chunkWidth * y, chunkHeight * x,
                        chunkWidth * y + chunkWidth, chunkHeight * x + chunkHeight, null);
                gr.dispose();
            }
        }
        return imgs;
    }
    // for (int i = 0; i < imgs.length; i++) {
    // ImageIO.write(imgs[i], "jpg", new File(i + ".jpg"));
    // }
}
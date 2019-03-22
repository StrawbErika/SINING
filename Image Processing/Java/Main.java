import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.awt.*;

public class Main {
  public static void main(String[] args) throws IOException {

    ImageSplitTest img = new ImageSplitTest();
    BufferedImage imgs[] = img.splitImage("t1.jpg");
    for (int i = 0; i < imgs.length; i++) {
      ImageIO.write(imgs[i], "jpg", new File(i + ".jpg"));
    }

  }
}

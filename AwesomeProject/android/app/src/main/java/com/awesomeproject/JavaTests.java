import java.io.*;
import java.util.*;

public class JavaTests {
    public static void main(String[] args) throws IOException {
        String fileName = "../../../assets/Sections/BL/output_labels.txt";
        File file = new File(fileName);
        FileReader fr = new FileReader(file);
        BufferedReader br = new BufferedReader(fr);
        String line;
        while ((line = br.readLine()) != null) {
            // process the line
            System.out.println(line);
        }
    }
}
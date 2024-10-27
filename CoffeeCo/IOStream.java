import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;

public class IOStream {
    public static void main(String[] args) {
        try {
            InputStream in = System.in;
            OutputStream out = System.out;

            int c;
            while ((c = in.read()) != -1) {
                out.write(c);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
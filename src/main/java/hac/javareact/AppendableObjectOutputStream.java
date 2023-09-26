package hac.javareact;

import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.OutputStream;

/**
 * A class that extends the ObjectOutputStream class and overrides the writeStreamHeader method.
 * This is done in order to allow appending to the file.
 */
class AppendableObjectOutputStream extends ObjectOutputStream {
    /**
     * ctor receives an OutputStream object and passes it to the super class.
     * @param out the OutputStream object.
     * @throws IOException in case of an I/O error.
     */
    public AppendableObjectOutputStream(OutputStream out) throws IOException {
        super(out);
    }

    /**
     * Overrides the writeStreamHeader method in order to allow appending to the file.
     * @throws IOException in case of an I/O error.
     */
    @Override
    protected void writeStreamHeader() throws IOException {
        reset();
    }
}

package exceptions;

/**
 * An exception that is thrown when a duplicate value is found.
 */
public class DuplicateValueException extends Exception {
    /**
     * ctor receives a message and creates an exception with that message.
     * @param message the message.
     */
    public DuplicateValueException(String message) {
        super(message);
    }
}

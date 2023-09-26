package exceptions;

import java.util.Arrays;

/**
 * An exception that is thrown when a mandatory parameter is missing.
 */
public class MissingParameterException extends Exception{
    /**
     * ctor receives a list of parameters and creates an exception with a message that some parameters are missing.
     * @param missingParameters the parameters.
     */
    public MissingParameterException(String... missingParameters) {
        super(String.format("The following mandatory parameters are missing or may be missing: %s", Arrays.toString(missingParameters)));
    }
}



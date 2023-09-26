package hac.javareact;
import exceptions.DuplicateValueException;
import com.google.gson.Gson;
import exceptions.MissingParameterException;

import java.io.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

/**
 *  servlet to handle the highscores API.
 *  uses a file to store the highscores.
 *  the file contains a list of Record objects.
 *  the API handles GET and POST requests and updates the highscores file.
 */

@WebServlet(name = "ApiServlet", value = "/api/highscores")
public class ApiServlet extends HttpServlet {
    private static final String SCORES = "scores.dat";
    private static final String PARAM_NAME = "name";
    private static final String PARAM_SCORE = "score";
    private static final int TOP_HIGHSCORES = 5;
    private static final String TYPE_ERROR = "score must be a number.";
    private static final String DUPLICATE_ERROR = "username already exists.";
    private static final String IO_ERROR = "cannot read/write to file.";

    /**
     * The path to the file that contains the highscores.
     */
    private String filePath;

    /**
     * get the top-5 highscores from the file.
     * @param request data of the incoming request from the client
     * @param response the response to send to the client
     * @throws IOException if the file cannot be read.
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json");

        try {
            List<Record> records = getRecords();
            records.sort(Comparator.comparing(Record::getScore));
            List<Record> topRecords = records.subList(0, Math.min(records.size(), TOP_HIGHSCORES)); // top 5 records
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(new Gson().toJson(topRecords));
        } catch (ClassNotFoundException e) {
            response.getWriter().write(e.getMessage());
        } catch (IOException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write(IO_ERROR);
        }
    }

    /**
     * add a new record to the file.
     * @param request data of the incoming request from the client
     * @param response the response to send to the client
     * @throws IOException if the file cannot be read/written.
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("application/json");

        try {
            // ensure that the number of parameters is correct
            validateParameters(request.getParameterMap());
            String name = request.getParameter(PARAM_NAME);
            int score = Integer.parseInt(request.getParameter(PARAM_SCORE));
            List<Record> records = getRecords();
            Record record = new Record();
            record.setName(name);
            record.setScore(score);
            writeRecord(record, records); // write the new record to the file
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(TYPE_ERROR);
        } catch (MissingParameterException | DuplicateValueException | ClassNotFoundException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(e.getMessage());
        }  catch (IOException e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write(IO_ERROR);
        }
    }

    /**
     * validate that the request contains the correct number of parameters.
     * @param parameterMap the parameters of the request.
     * @throws MissingParameterException if parameters are missing.
     */
    private void validateParameters(Map<String, String[]> parameterMap) throws MissingParameterException {
        if (!parameterMap.containsKey(PARAM_NAME) || !parameterMap.containsKey(PARAM_SCORE)) {
            throw new MissingParameterException(PARAM_NAME, PARAM_SCORE);
        }
    }

    /**
     * read the records from the file.
     * @return the records from the file.
     * @throws IOException if the file cannot be read.
     * @throws ClassNotFoundException if the file contains an object that is not a Record.
     */
    private List<Record> getRecords() throws IOException, ClassNotFoundException {
        if(!new File(filePath).exists()) {
            return new ArrayList<>();
        }
        List<Record> records = new ArrayList<>();
        synchronized (Record.class) {
            try (FileInputStream fileInputStream = new FileInputStream(filePath);
                 ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream)) {
                Record record;
                while ((record = (Record) objectInputStream.readObject()) != null) {
                    records.add(record);
                }
            } catch (EOFException e) {/*end of file*/}
        }
        return records;
    }


    /**
     * write a record to the file. if the file does not exist, it will be created.
     * if the file already contains a record with the same name, an exception will be thrown.
     * @param record the record to write to the file.
     * @param records the records that are already in the file.
     * @throws DuplicateValueException if the file already contains a record with the same name.
     * @throws IOException if the file cannot be written.
     */
    private void writeRecord(Record record, List<Record> records) throws DuplicateValueException, IOException {
        boolean isFileExist = new File(filePath).exists();
        List<String> names = new ArrayList<>();
        for (Record rec: records) {
            names.add(rec.getName());
        }
        if(names.contains(record.getName())) {
            throw new DuplicateValueException(DUPLICATE_ERROR);
        }
        synchronized (Record.class) {
            try ( FileOutputStream fileOutputStream = new FileOutputStream(filePath, true);
                  ObjectOutputStream objectOutputStream = isFileExist ?
                          new AppendableObjectOutputStream(fileOutputStream) :
                          new ObjectOutputStream(fileOutputStream)) {
                objectOutputStream.writeObject(record);
                objectOutputStream.flush();
            }
        }
    }

    /**
     * init the servlet.
     * @throws ServletException servlet exception.
     */
    @Override
    public void init() throws ServletException {
        super.init();
        filePath = getServletContext().getRealPath(".") + File.separator + SCORES;
    }

    /**
     * destroy the servlet.
     */
    @Override
    public void destroy() {
        super.destroy();
    }
}

package hac.javareact;
import java.io.Serializable;

/**
 * A class that represents the records of the game.
 */
class Record implements Serializable {
    /**
     * The serial version UID of this class.
     */
    private static final long serialVersionUID = 1L;
    /**
     * The name of the player.
     */
    private String _name;
    /**
     * The score of the player.
     */
    private int _score;

    /**
     * get the name of the player.
     * @return the name of the player.
     */
    public String getName() { return _name; }
    /**
     * get the score of the player.
     * @return the score of the player.
     */
    public int getScore() { return _score; }
    /**
     * set the name of the player.
     * @param name the name of the player.
     */
    public void setName(String name) { _name = name; }
    /**
     * set the score of the player.
     * @param score the score of the player.
     */
    public void setScore(int score) { _score = score; }

}

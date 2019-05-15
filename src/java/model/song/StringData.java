package model.song;

import model.song.*;
import dbUtils.FormatUtils;
import java.sql.ResultSet;


/* The purpose of this class is just to "bundle together" all the 
 * character data that the user might type in when they want to 
 * add a new Customer or edit an existing customer.  This String
 * data is "pre-validated" data, meaning they might have typed 
 * in a character string where a number was expected.
 * 
 * There are no getter or setter methods since we are not trying to
 * protect this data in any way.  We want to let the JSP page have
 * free access to put data in or take it out. */
public class StringData {

    public String songId = "";
    public String songName = "";
    public String artist = "";
    public String songGenre = "";
    public String playlistName = "";
    public String userEmail = "";

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            this.songId = FormatUtils.formatInteger(results.getObject("song_id"));
            this.songName = FormatUtils.formatString(results.getObject("song_name"));
            this.artist = FormatUtils.formatString(results.getObject("artist"));
            this.songGenre = FormatUtils.formatString(results.getObject("song_genre"));
            this.playlistName = FormatUtils.formatString(results.getObject("playlist_name"));
            this.userEmail = FormatUtils.formatString(results.getObject("user_email"));

        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.webUser.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.songId + this.songName + this.artist + this.songGenre + this.playlistName + this.userEmail;
            
        return s.length();
    }

    public String toString() {
        return "Song Id:" + this.songId
                + ",Song Name:" + this.songName
                + ", Artist: " + this.artist
                + ", Song Genre: " + this.songGenre
                + ", Playlist/Album Name: " + this.playlistName
                + ", Artist's Email: " + this.userEmail;

    }
}

package model.playlist;

import model.playlist.*;
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

    public String playlistId = "";
    public String name = "";
    public String thumbnail = "";
    public String genre = "";
    public String dateUploaded = "";
    public String creator = "";  

    public String errorMsg = "";

    // default constructor leaves all data members with empty string (Nothing null).
    public StringData() {
    }

    // overloaded constructor sets all data members by extracting from resultSet.
    public StringData(ResultSet results) {
        try {
            this.playlistId = FormatUtils.formatInteger(results.getObject("playlist_id"));
            this.name = FormatUtils.formatString(results.getObject("playlist_name"));
            this.thumbnail = FormatUtils.formatString(results.getObject("thumbnail"));
            this.genre = FormatUtils.formatString(results.getObject("genre"));
            this.dateUploaded = FormatUtils.formatDate(results.getObject("playlist_date_uploaded"));
            this.creator = FormatUtils.formatString(results.getObject("creator"));
   
        } catch (Exception e) {
            this.errorMsg = "Exception thrown in model.playlist.StringData (the constructor that takes a ResultSet): " + e.getMessage();
        }
    }

    public int getCharacterCount() {
        String s = this.playlistId + this.name + this.thumbnail + this.genre
                + this.dateUploaded + this.creator;
        return s.length();
    }

    public String toString() {
        return "Playlist Id:" + this.playlistId
                + ", Playlist Name: " + this.name
                + ", Thumbnail: " + this.thumbnail
                + ", Genre: " + this.genre
                + ", Date Uploaded: " + this.dateUploaded
                + ", Playlist Creator: " + this.creator;
    }
}

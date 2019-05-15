 package model.song;
    import dbUtils.*;
    import java.sql.PreparedStatement;
    import java.sql.ResultSet;
 
 
    public class DbMods {
        

        private static StringData validate(StringData inputData) {

            StringData errorMsgs = new StringData();

            errorMsgs.songName = ValidationUtils.stringValidationMsg(inputData.songName, 45, true);

            return errorMsgs;
        } // validate 

        
        public static StringData insert(StringData inputData, DbConn dbc) {

            StringData errorMsgs = new StringData();
            errorMsgs = validate(inputData);
            if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
                errorMsgs.errorMsg = "Please try again";
                return errorMsgs;

            } else { // all fields passed validation


                String sql = "INSERT INTO song (song_name, song_genre, artist, web_user_id, playlist_id) "
                        + "values (?,?,?,?,?)";

                // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
                // Only difference is that Sally's class takes care of encoding null 
                // when necessary. And it also System.out.prints exception error messages.
                PrepStatement pStatement = new PrepStatement(dbc, sql);

                // Encode string values into the prepared statement (wrapper class).
                pStatement.setString(1, inputData.songName); // string type is simple
                pStatement.setString(2, inputData.songGenre);
                pStatement.setString(3, inputData.artist);
                pStatement.setInt(4, ValidationUtils.integerConversion(inputData.userEmail));
                pStatement.setInt(5, ValidationUtils.integerConversion(inputData.playlistName));

                // here the SQL statement is actually executed
                int numRows = pStatement.executeUpdate();

                // This will return empty string if all went well, else all error messages.
                errorMsgs.errorMsg = pStatement.getErrorMsg();
                if (errorMsgs.errorMsg.length() == 0) {
                    if (numRows == 1) {
                        errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                    } else {
                        // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                        errorMsgs.errorMsg = numRows + " records were inserted when exactly 1 was expected.";
                    }
                } else if (errorMsgs.errorMsg.contains("foreign key")) {
                    errorMsgs.errorMsg = "Invalid User Role Id";
                } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                    errorMsgs.errorMsg = "That email address is already taken";
                }

            } // customerId is not null and not empty string.
            return errorMsgs;
            
        } // insert
        
        
        public static String delete(String songId, DbConn dbc) {

            if (songId == null) {
                return "Programmer error: cannot attempt to delete playlist record that matches null playlist id";
            }

            // This method assumes that the calling Web API (JSP page) has already confirmed 
            // that the database connection is OK. BUT if not, some reasonable exception should 
            // be thrown by the DB and passed back anyway... 
            String result = ""; // empty string result means the delete worked fine.
            try {

                String sql = "DELETE FROM song WHERE song_id = ?";

                // This line compiles the SQL statement (checking for syntax errors against your DB).
                PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

                // Encode user data into the prepared statement.
                pStatement.setString(1, songId);

                int numRowsDeleted = pStatement.executeUpdate();

                if (numRowsDeleted == 0) {
                    result = "Programmer Error: did not delete the record with playlist_id " + songId;
                } else if (numRowsDeleted > 1) {
                    result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
                }

            } catch (Exception e) {
                result = "Exception thrown in model.webUser.DbMods.delete(): " + e.getMessage();
            }

            return result;
        }
        

    } // class
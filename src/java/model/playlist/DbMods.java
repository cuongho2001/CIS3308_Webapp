 package model.playlist;
    import dbUtils.*;
    import java.sql.PreparedStatement;
    import java.sql.ResultSet;
 
 
    public class DbMods {
        
        
        public static String delete(String playlistId, DbConn dbc) {

            if (playlistId == null) {
                return "Programmer error: cannot attempt to delete playlist record that matches null playlist id";
            }

            // This method assumes that the calling Web API (JSP page) has already confirmed 
            // that the database connection is OK. BUT if not, some reasonable exception should 
            // be thrown by the DB and passed back anyway... 
            String result = ""; // empty string result means the delete worked fine.
            try {

                String sql = "DELETE FROM playlist WHERE playlist_id = ?";

                // This line compiles the SQL statement (checking for syntax errors against your DB).
                PreparedStatement pStatement = dbc.getConn().prepareStatement(sql);

                // Encode user data into the prepared statement.
                pStatement.setString(1, playlistId);

                int numRowsDeleted = pStatement.executeUpdate();

                if (numRowsDeleted == 0) {
                    result = "Programmer Error: did not delete the record with playlist_id " + playlistId;
                } else if (numRowsDeleted > 1) {
                    result = "Programmer Error: > 1 record deleted. Did you forget the WHERE clause?";
                }

            } catch (Exception e) {
                result = "Exception thrown in model.webUser.DbMods.delete(): " + e.getMessage();
            }

            return result;
        }
        
        
        public static StringData update(StringData inputData, DbConn dbc) {

        StringData errorMsgs = new StringData();
        if (errorMsgs.getCharacterCount() > 0) {  // at least one field has an error, don't go any further.
            errorMsgs.errorMsg = "Please try again";
            return errorMsgs;

        } else { // all fields passed validation


            String sql = "UPDATE playlist SET playlist_name=?, creator=?, genre=?, playlist_date_uploaded=?, thumbnail=? "+
                    " WHERE playlist_id = ?";

            // PrepStatement is Sally's wrapper class for java.sql.PreparedStatement
            // Only difference is that Sally's class takes care of encoding null 
            // when necessary. And it also System.out.prints exception error messages.
            PrepStatement pStatement = new PrepStatement(dbc, sql);

            // Encode string values into the prepared statement (wrapper class).
            pStatement.setString(1, inputData.name); // string type is simple
            pStatement.setString(2, inputData.creator);
            pStatement.setString(3, inputData.genre);
            pStatement.setDate(4, ValidationUtils.dateConversion(inputData.dateUploaded));
            pStatement.setString(5, inputData.thumbnail);
            pStatement.setInt(6, ValidationUtils.integerConversion(inputData.playlistId));

            // here the SQL statement is actually executed
            int numRows = pStatement.executeUpdate();

            // This will return empty string if all went well, else all error messages.
            errorMsgs.errorMsg = pStatement.getErrorMsg();
            if (errorMsgs.errorMsg.length() == 0) {
                if (numRows == 1) {
                    errorMsgs.errorMsg = ""; // This means SUCCESS. Let the user interface decide how to tell this to the user.
                } else {
                    // probably never get here unless you forgot your WHERE clause and did a bulk sql update.
                    errorMsgs.errorMsg = numRows + " records were updated (expected to update one record).";
                }
            } else if (errorMsgs.errorMsg.contains("foreign key")) {
                errorMsgs.errorMsg = "Invalid User Role Id";
            } else if (errorMsgs.errorMsg.contains("Duplicate entry")) {
                errorMsgs.errorMsg = "That email address is already taken";
            }

        } // customerId is not null and not empty string.
        return errorMsgs;
    } // update

    } // class
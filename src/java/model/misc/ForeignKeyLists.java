package model.misc;

import dbUtils.DbConn;
import dbUtils.FormatUtils;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

// I would have made the data members of this class be a user pick list 
// and an "other" pick list (to make it useful if insert associative would 
// have two pick lists - one for each foreign key... But I have not implemented
// code for the "other" table, so I showed the general concept of how to have
// two array lists in the same object by using role as the second arraylist. 

public class ForeignKeyLists {

// The purpose of this class is to have a java object that can be converted to JSON 
// with all the data you need for the FK pick lists (other pick list and user pick list). 
// Bundling these two lists together so that the JavaScript does not have to make 
// two ajax calls for this. 
    public String dbError = "";
    public ArrayList<model.webUser.StringData> userPickList = new ArrayList();
    public ArrayList<model.role.StringData> rolePickList = new ArrayList();
    public ArrayList<model.playlist.StringData> playlistList = new ArrayList();

    // Default constructor leaves StringDataList objects nicely set with properties 
    // indicating no database error and 0 elements in the list.
    public ForeignKeyLists(DbConn dbc) {
        this.dbError = dbc.getErr();
        if (dbError.length() == 0) {
            setUserPickList(dbc);
            setRolePickList(dbc);
            setPlaylistPickList(dbc);
        }
    }

    public void setUserPickList(DbConn dbc) {

        try {
            // always order by something, not random order.
            String sql = "SELECT web_user_id, user_email FROM web_user ORDER BY user_email ";

            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                model.webUser.StringData sd = new model.webUser.StringData();

                // null all properties - because we only will use two properties
                // and the gson code will not output null properties to JSON (which is what we want). 
                sd.setNull();
                sd.webUserId = FormatUtils.plainInteger(results.getObject("web_user_id"));
                sd.userEmail = FormatUtils.formatString(results.getObject("user_email"));
                sd.errorMsg = "";
                this.userPickList.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            model.webUser.StringData sd = new model.webUser.StringData();
            sd.setNull();
            sd.webUserId = "";
            sd.userEmail = ""; 
            sd.errorMsg = "Exception thrown in WebUserView.allUsersAPI(): " + e.getMessage();
            this.userPickList.add(sd);
        }
    }

    public void setRolePickList(DbConn dbc) {

        try {
            // Always order by something, not just random order
            String sql = "SELECT user_role_id, user_role_type "
                    + "FROM user_role ORDER BY user_role_type ";
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                model.role.StringData sd = new model.role.StringData();
                sd.userRoleId = FormatUtils.plainInteger(results.getObject("user_role_id"));
                sd.userRoleType = FormatUtils.formatString(results.getObject("user_role_type"));
                this.rolePickList.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            model.role.StringData sd = new model.role.StringData();
            sd = new model.role.StringData();
            sd.errorMsg = "Exception thrown in RoleView.allRolesAPI(): " + e.getMessage();
            this.rolePickList.add(sd);
        }
    }
    
    public void setPlaylistPickList(DbConn dbc) {

        try {
            // Always order by something, not just random order
            String sql = "SELECT playlist_id, playlist_name "
                    + "FROM playlist ORDER BY playlist_name ";
            PreparedStatement stmt = dbc.getConn().prepareStatement(sql);
            ResultSet results = stmt.executeQuery();
            while (results.next()) {
                model.playlist.StringData sd = new model.playlist.StringData();
                sd.playlistId = FormatUtils.plainInteger(results.getObject("playlist_id"));
                sd.name = FormatUtils.formatString(results.getObject("playlist_name"));
                this.playlistList.add(sd);
            }
            results.close();
            stmt.close();
        } catch (Exception e) {
            model.playlist.StringData sd = new model.playlist.StringData();
            sd = new model.playlist.StringData();
            sd.errorMsg = "Exception thrown in RoleView.allRolesAPI(): " + e.getMessage();
            this.playlistList.add(sd);
        }
    }
}

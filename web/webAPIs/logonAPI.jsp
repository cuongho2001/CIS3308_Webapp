<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="dbUtils.*" %>
<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // default constructor creates nice empty StringDataList with all fields "" (empty string, nothing null).
    StringData user = new StringData();

    String userEmail = request.getParameter("email");
    String userPassword = request.getParameter("password");
    
    if (userEmail == null || userPassword == null) {
        user.errorMsg = "Cannot search for user - email and password must be supplied.";
  
        
    } else {

        DbConn dbc = new DbConn();
        user.errorMsg = dbc.getErr(); // returns "" if connection is good, else db error msg.

        if (user.errorMsg.length() == 0) { // if got good DB connection,

            System.out.println("*** Ready to call logonAPI");
            StringData ret = DbMods.logonFind(userEmail,userPassword,dbc);
            
            
            
            if (ret == null) {
                
                user.errorMsg = "Invalid email or password. Try again!";
                
            } else {
                session.setAttribute ("webUser", ret);
                user = ret;
            }
            
        }

        dbc.close(); // EVERY code path that opens a db connection, must also close it - no DB Conn leaks.
         // make up whatever name you want for 2nd parameter 
    }
    
    Gson gson = new Gson();
    out.print(gson.toJson(user).trim());
%>    

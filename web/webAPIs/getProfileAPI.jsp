<%@page contentType="application/json; charset=UTF-8" pageEncoding="UTF-8"%> 

<%@page language="java" import="model.webUser.*" %> 
<%@page language="java" import="view.WebUserView" %> 
<%@page language="java" import="com.google.gson.*" %>

<%

    // must use same name for getAttribute as you used for setAttribute in the logon API
    // must type class the object that is extracted.
    StringData loggedOnWebUser = (StringData) session.getAttribute("webUser");
    
    if (loggedOnWebUser != null) {
        Gson gson = new Gson();
        out.print(gson.toJson(loggedOnWebUser).trim());

    } else {
        out.print(" You are not logged on! Please log on before viewing.");
    }
    
    
%>


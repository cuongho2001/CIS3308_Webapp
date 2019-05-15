
var account = { }; // define global empty object

account.logon = function (emailId, pwId) {
    
 // Must use “escape” to clean user input so security related errors don’t interfere with your code functioning
 
    var emailUserInput = escape(document.getElementById(emailId).value);
    var pwUserInput = escape(document.getElementById(pwId).value);
 
 
 // make ajax call, specifying callback function
    ajax("webAPIs/logonAPI.jsp?email=" + emailUserInput + "&password=" + pwUserInput, processLogon, "msgId");
 
 
 function processLogon(httpRequest) {
     
        var target = document.getElementById("msgId");
        target.innerHTML = "";
        
        
        var obj = JSON.parse(httpRequest.responseText);
     
        
        if (obj.errorMsg !==  "") {
            target.innerHTML = "Invalid input. Try again";
        } else {
            target.innerHTML = "<h4>WELCOME! YOU ARE LOGGED IN!</h4>";
            target.innerHTML += "Web User Id: " + obj.webUserId;
            target.innerHTML += "<br/>User Email: " + obj.userEmail;
            target.innerHTML += "<br/>Birthday: " + obj.birthday;
            target.innerHTML += "<br/>Membership Fee: " + obj.membershipFee;
            target.innerHTML += "<br/>Role Id: " + obj.userRoleId;
            target.innerHTML += "<br/>Role Type: " + obj.userRoleType;
        }
        
 }
 
 
};


account.logout = function () {
    
    ajaxFillId("webAPIs/logoffAPI.jsp", "content");
    
};

account.profile = function () {
    ajaxFillId("webAPIs/getProfileAPI.jsp", "content");
};



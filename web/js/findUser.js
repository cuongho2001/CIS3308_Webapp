function findUserFn(id) {

    ajax("webAPIs/getUserByIdAPI.jsp?id=" + id, displayUser, "userInfoHere");

    function displayUser(httpRequest) {
        
        var target = document.getElementById("userInfoHere");
        target.innerHTML = "";
        
        var obj = JSON.parse(httpRequest.responseText);
        if (obj.webUserList.length === 0) {
            target.innerHTML = "There is no user with id '" + id + "' in the database";
        } else if (obj.webUserList[0].errorMsg.length > 0) {
            target.innerHTML = "Error extracting the Web User from the database: " + obj.webUserList[0].errorMsg;
        } else {
            target.innerHTML = "<h4>User Profile</h4>";
            target.innerHTML += "Web User Id: " + obj.webUserList[0].webUserId;
            target.innerHTML += "<br/>User Email: " + obj.webUserList[0].userEmail;
            target.innerHTML += "<br/>Birthday: " + obj.webUserList[0].birthday;
            target.innerHTML += "<br/>Membership Fee: " + obj.webUserList[0].membershipFee;
            target.innerHTML += "<br/>Role Id: " + obj.webUserList[0].userRoleId;
            target.innerHTML += "<br/>Role Type: " + obj.webUserList[0].userRoleType;
        }
    }
}



var userCRUD = {}; // globally available object


(function () {  // This is an IIFE, an Immediately Invoked Function Expression
    //alert("I am an IIFE!");

    userCRUD.startUpdate = function (userId) {
        
        ajax('htmlPartials/updateUser.html', setcontentUI, 'content');
        
        function setcontentUI (httpRequest) {
            
            console.log("Ajax call was successful.");
            document.getElementById("content").innerHTML = httpRequest.responseText;
            
            
            ajax("webAPIs/getUserByIdAPI.jsp?id=" + userId, displayUser, "recordError");

                function displayUser(httpRequest) {
                            
                            var userObj = JSON.parse(httpRequest.responseText).webUserList[0];
                            
                            document.getElementById("webUserId").value = userObj.webUserId;
                            document.getElementById("userEmail").value = userObj.userEmail;
                            document.getElementById("userPassword").value = userObj.userPassword;
                            document.getElementById("userPassword2").value = userObj.userPassword;
                            document.getElementById("birthday").value = userObj.birthday;
                            document.getElementById("membershipFee").value = userObj.membershipFee;                       
                        
                }



            ajax("webAPIs/getRolesAPI.jsp", setRolePickList, "userRoleIdError");

            function setRolePickList(httpRequest) {

                console.log("setRolePickList was called, see next line for object holding list of roles");
                var jsonObj = JSON.parse(httpRequest.responseText); // convert from JSON to JS Object.
                console.log(jsonObj);

                if (jsonObj.dbError.length > 0) {
                    document.getElementById("userRoleIdError").innerHTML = jsonObj.dbError;
                    return;
                }

                // function makePickList(list, keyProp, valueProp, selectListId) {
                makePickList(jsonObj.roleList, "userRoleId", "userRoleType", "rolePickList");
            }
        }
        
    };

    userCRUD.startInsert = function () {

        ajax('htmlPartials/insertUpdateUser.html', setInsertUI, 'content');

        function setInsertUI(httpRequest) {

            // Place the inserttUser html snippet into the content area.
            console.log("Ajax call was successful.");
            document.getElementById("content").innerHTML = httpRequest.responseText;

            ajax("webAPIs/getRolesAPI.jsp", setRolePickList, "userRoleIdError");

            function setRolePickList(httpRequest) {

                console.log("setRolePickList was called, see next line for object holding list of roles");
                var jsonObj = JSON.parse(httpRequest.responseText); // convert from JSON to JS Object.
                console.log(jsonObj);

                if (jsonObj.dbError.length > 0) {
                    document.getElementById("userRoleIdError").innerHTML = jsonObj.dbError;
                    return;
                }

                // function makePickList(list, keyProp, valueProp, selectListId) {
                makePickList(jsonObj.roleList, "userRoleId", "userRoleType", "rolePickList");
            }
        }
    };


    userCRUD.insertSave = function () {

        console.log ("userCRUD.insertSave was called");

        var ddList = document.getElementById("rolePickList");

        // create a user object from the values that the user has typed into the page.
        var userInputObj = {
            "webUserId": "",
            "userEmail": document.getElementById("userEmail").value,
            "userPassword": document.getElementById("userPassword").value,
            "userPassword2": document.getElementById("userPassword2").value,
            "birthday": document.getElementById("birthday").value,
            "membershipFee": document.getElementById("membershipFee").value,

            // Modification here for role pick list
            "userRoleId": ddList.options[ddList.selectedIndex].value,

            "userRoleType": "",
            "errorMsg": ""
        };
        console.log(userInputObj);

        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        var myData = escape(JSON.stringify(userInputObj));
        var url = "webAPIs/insertUserAPI.jsp?jsonData=" + myData;
        ajax(url, processInsert, "recordError");

        function processInsert(httpRequest) {
            console.log("processInsert was called here is httpRequest.");
            console.log(httpRequest);

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fiels named exactly 
            // the same as the input data was named. 
            var jsonObj = JSON.parse(httpRequest.responseText); // convert from JSON to JS Object.
            console.log("here is JSON object (holds error messages.");
            console.log(jsonObj);

            document.getElementById("userEmailError").innerHTML = jsonObj.userEmail;
            document.getElementById("userPasswordError").innerHTML = jsonObj.userPassword;
            document.getElementById("userPassword2Error").innerHTML = jsonObj.userPassword2;
            document.getElementById("birthdayError").innerHTML = jsonObj.birthday;
            document.getElementById("membershipFeeError").innerHTML = jsonObj.membershipFee;
            document.getElementById("userRoleIdError").innerHTML = jsonObj.userRoleId;

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }
            document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
        }
    };
    
    userCRUD.updateSave = function() {
        console.log("update user was called");

        // create a user object from the values that the user has typed into the page.

        var dollar = stripDollar(document.getElementById("membershipFee").value);

        var pickList = document.getElementById("rolePickList");
        var pickListValue = pickList.options[pickList.selectedIndex].value;

        var userInputObj = {
            "webUserId": document.getElementById("webUserId").value,
            "userEmail": document.getElementById("userEmail").value,
            "userPassword": document.getElementById("userPassword").value,
            "userPassword2": document.getElementById("userPassword2").value,
            "birthday": document.getElementById("birthday").value,
            "membershipFee": dollar,

            "userRoleId": pickListValue,

            "userRoleType": "",
            "errorMsg": ""
        };
        console.log(userInputObj);

        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        var myData = escape(JSON.stringify(userInputObj));
        var url = "webAPIs/updateUserAPI.jsp?jsonData=" + myData;
        ajax(url, processUpdate, "recordError");

        function processUpdate(httpRequest) {
            console.log("processUpdate was called here is httpRequest.");
            console.log(httpRequest);

            // the server prints out a JSON string of an object that holds field level error 
            // messages. The error message object (conveniently) has its fields named exactly 
            // the same as the input data was named. 
            var jsonObj = JSON.parse(httpRequest.responseText); // convert from JSON to JS Object.
            console.log("here is JSON object (holds error messages.");
            console.log(jsonObj);

            // place error messages on the page
            document.getElementById("userEmailError").innerHTML = jsonObj.userEmail;
            document.getElementById("userPasswordError").innerHTML = jsonObj.userPassword;
            document.getElementById("userPassword2Error").innerHTML = jsonObj.userPassword2;
            document.getElementById("birthdayError").innerHTML = jsonObj.birthday;
            document.getElementById("membershipFeeError").innerHTML = jsonObj.membershipFee;
            document.getElementById("userRoleIdError").innerHTML = jsonObj.userRoleId;

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully updated !!!";
            }
            document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
        }

// remove commas and $ from user entered dollar amount.
        function stripDollar(dollar) {
            dollar = dollar.replace("$", ""); // replace $ with empty string
            dollar = dollar.replace(",", ""); // replace comma with empty string
            return dollar;
        }
        
    };
    
    
    userCRUD.delete = function (userId, icon) {
        if (confirm("Do you really want to delete user " + userId + "? ")) {
            console.log("icon that was passed into JS function is printed on next line");
            console.log(icon);
            
            ajax("webAPIs/deleteUserAPI.jsp?deleteId=" + userId, onSuccess, icon);
            
            function onSuccess (httpRequest) {

            // HERE YOU HAVE TO CALL THE DELETE API and the success function should run the 
            // following (delete the row that was clicked from the User Interface).
                var obj = JSON.parse(httpRequest.responseText);
                
                console.log(obj);
                
                if (obj.errorMsg !== "") {
                    alert(obj.errorMsg);
                } else {
                
            // icon's parent is cell whose parent is row 
                    var dataRow = icon.parentNode.parentNode;
                    var rowIndex = dataRow.rowIndex - 1; // adjust for oolumn header row?
                    var dataTable = dataRow.parentNode;
                    dataTable.deleteRow(rowIndex);
                }
            
            }
        }

    };


    userCRUD.list = function (targetId) {

    var dataList = document.createElement("div");
    dataList.id = "dataList"; // set the id so it matches CSS styling rules in listStyle.css
    dataList.innerHTML = "<h2>Web Users <img id='addUser' src='icons/insert.png' onclick='userCRUD.startInsert();'/></h2>";
    dataList.innerHTML += "<h3 id='listMsg'></h3>";

    document.getElementById(targetId).innerHTML = "";
    document.getElementById(targetId).appendChild(dataList);

    ajax('webAPIs/listUsersAPI.jsp', setListUI, 'listMsg');

    function setListUI(httpRequest) {

        console.log("starting userCRUD.list (setListUI) with this httpRequest object (next line)");
        console.log(httpRequest);

        var obj = JSON.parse(httpRequest.responseText);

        if (obj === null) {
            document.getElementById("listMsg").innerHTML = "userCRUD.list Error: JSON string evaluated to null.";
            return;
        }

        for (var i = 0; i < obj.webUserList.length; i++) {

            // how you would add a new property if you wanted to
            obj.webUserList[i].userRole = obj.webUserList[i].userRoleId + " " +
                    obj.webUserList[i].userRoleType;
            
            var id = obj.webUserList[i].webUserId;
            obj.webUserList[i].delete = "<img src='icons/delete.png'  onclick='userCRUD.delete(" + id + ",this)'  />";
            obj.webUserList[i].update = "<img src='icons/update.png' onclick='userCRUD.startUpdate("+id+")'  />";

            // how to delete properties
            delete obj.webUserList[i].userRoleId;
            delete obj.webUserList[i].userRoleType;
            delete obj.webUserList[i].userPassword2;
        }

        // buildTable Parameters: 
        // First:  array of objects that are to be built into an HTML table.
        // Second: string that is database error (if any) or empty string if all OK.
        // Third:  reference to DOM object where built table is to be stored. 
        buildTable(obj.webUserList, obj.dbError, dataList);
    }
    };
    
    

}());  // the end of the IIFE
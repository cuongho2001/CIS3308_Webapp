

var playlistCRUD = {}; // globally available object

(function () {  // This is an IIFE, an Immediately Invoked Function Expression
    //alert("I am an IIFE!");
    
    playlistCRUD.startUpdate = function (playlistId) {
        ajax('htmlPartials/updatePlaylist.html', setcontentUI, 'content');
        
        function setcontentUI (httpRequest) {
            
            console.log("Ajax call was successful.");
            document.getElementById("content").innerHTML = httpRequest.responseText;
            
            
            ajax("webAPIs/getPlaylistByIdAPI.jsp?id=" + playlistId, displayUser, "recordError");

                function displayUser(httpRequest) {
                            
                            var playlistObj = JSON.parse(httpRequest.responseText).playlistList[0];
                            console.log(playlistObj);
                            document.getElementById("playlistId").value = playlistObj.playlistId;
                            document.getElementById("playlistName").value = playlistObj.name;
                            document.getElementById("creator").value = playlistObj.creator;
                            document.getElementById("genre").value = playlistObj.genre;
                            document.getElementById("dateUploaded").value = playlistObj.dateUploaded;
                    
                        
                }
                
        }
        
    };

    playlistCRUD.startInsert = function () {

        ajaxFillId('htmlPartials/insertUpdatePlaylist.html', 'content');

    };


    playlistCRUD.insertSave = function () {

        console.log ("playlistCRUD.insertSave was called");


        // create a user object from the values that the user has typed into the page.
        var playlistInputObj = {
      
            "name": document.getElementById("playlistName").value,
            "creator": document.getElementById("creator").value,
            "genre": document.getElementById("genre").value,
            "dateUploaded": document.getElementById("dateUploaded").value,

            "errorMsg": ""
        };
        console.log(playlistInputObj);

        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        var myData = escape(JSON.stringify(playlistInputObj));
        var url = "webAPIs/insertPlaylistAPI.jsp?jsonData=" + myData;
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

            document.getElementById("playlistNameError").innerHTML = jsonObj.name;
            document.getElementById("creatorError").innerHTML = jsonObj.creator;
            document.getElementById("genreError").innerHTML = jsonObj.genre;
            document.getElementById("dateError").innerHTML = jsonObj.dateUploaded;
            
            //everything went through, no error
            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }
            document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
        }
    };
    
    
    playlistCRUD.updateSave = function() {

        var playlistInputObj = {
      
            "playlistId": document.getElementById("playlistId").value,
            "name": document.getElementById("playlistName").value,
            "creator": document.getElementById("creator").value,
            "genre": document.getElementById("genre").value,
            "dateUploaded": document.getElementById("dateUploaded").value,

            "errorMsg": ""
        };
        console.log(playlistInputObj);

        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        var myData = escape(JSON.stringify(playlistInputObj));
        var url = "webAPIs/updatePlaylistAPI.jsp?jsonData=" + myData;
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

            document.getElementById("playlistNameError").innerHTML = jsonObj.name;
            document.getElementById("creatorError").innerHTML = jsonObj.creator;
            document.getElementById("genreError").innerHTML = jsonObj.genre;
            document.getElementById("dateError").innerHTML = jsonObj.dateUploaded;
            
            //everything went through, no error
            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully updated !!!";
            }
            document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
        }
        
    };
    
    
    playlistCRUD.delete = function (playlistId, icon) {
        if (confirm("Do you really want to delete user " + playlistId + "? ")) {
            console.log("icon that was passed into JS function is printed on next line");
            console.log(icon);
            
            ajax("webAPIs/deletePlaylistAPI.jsp?deleteId=" + playlistId, onSuccess, icon);
            
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


    playlistCRUD.list = function (targetId) {

        var dataList = document.createElement("div");
        dataList.id = "dataList"; // set the id so it matches CSS styling rules in listStyle.css
        dataList.innerHTML = "<h2>Playlists <img src='icons/insert.png' onclick='playlistCRUD.startInsert();'/> </h2>";
        dataList.innerHTML += "<h3 id='listMsg'></h3>";

        document.getElementById("content").innerHTML = "";
        document.getElementById("content").appendChild(dataList);

        ajax('webAPIs/listPlaylistAPI.jsp', setListUI, 'listMsg');

        function setListUI(httpRequest) {

            console.log("starting playlistCRUD.list (setListUI) with this httpRequest object (next line)");
            console.log(httpRequest);

            var obj = JSON.parse(httpRequest.responseText);

            if (obj === null) {
                document.getElementById("listMsg").innerHTML = "playlistCRUD.list Error: JSON string evaluated to null.";
                return;
            }
            
            for (var i = 0; i < obj.playlistList.length; i++) {
            
                var id = obj.playlistList[i].playlistId;
                obj.playlistList[i].delete = "<img src='icons/delete.png'  onclick='playlistCRUD.delete(" + id + ",this)'  />";
                obj.playlistList[i].update = "<img src='icons/update.png' onclick='playlistCRUD.startUpdate("+id+")'  />";

            }

            // buildTable Parameters: 
            // First:  array of objects that are to be built into an HTML table.
            // Second: string that is database error (if any) or empty string if all OK.
            // Third:  reference to DOM object where built table is to be stored. 
            buildTable(obj.playlistList, obj.dbError, dataList);
        }
    };

}());  // the end of the IIFE




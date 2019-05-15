

var songCRUD = {}; // globally available object


(function () {  // This is an IIFE, an Immediately Invoked Function Expression
    //alert("I am an IIFE!");


    songCRUD.startInsert = function () {

        ajax('htmlPartials/insertUpdateSong.html', setInsertUI, 'content');

        function setInsertUI(httpRequest) {
            
            console.log("Ajax call was successful.");
            document.getElementById("content").innerHTML = httpRequest.responseText;

            ajax("webAPIs/foreignKeyPickListsAPI.jsp", makePickLists, "playlistPickListError");

            function makePickLists(httpRequest) {

                console.log("makePickList was called, see next line for object holding list of roles");
                var jsonObj = JSON.parse(httpRequest.responseText); // convert from JSON to JS Object.
                console.log(jsonObj);

                if (jsonObj.dbError.length > 0) {
                    document.getElementById("userRoleIdError").innerHTML = jsonObj.dbError;
                    return;
                }


                // function makePickList(list, keyProp, valueProp, selectListId) {
                makePickList(jsonObj.userPickList, "webUserId", "userEmail", "webUserPickList");
                
                makePickList(jsonObj.playlistList, "playlistId", "name", "playlistPickList");
            }
        }
    };



    songCRUD.insertSave = function () {

        console.log ("songCRUD.insertSave was called");

        var userList = document.getElementById("webUserPickList");
        
        var playlistList = document.getElementById("playlistPickList");

       // song Obj
        var songInputObj = {
            "songId": "",
            "songName": document.getElementById("songName").value,
            "artist": document.getElementById("creator").value,
            "songGenre": document.getElementById("genre").value,

            // Modification here for role pick list
            "userEmail": userList.options[userList.selectedIndex].value,
            "playlistName": playlistList.options[playlistList.selectedIndex].value,

            "errorMsg": ""
        };
        console.log(songInputObj);

        // build the url for the ajax call. Remember to escape the user input object or else 
        // you'll get a security error from the server. JSON.stringify converts the javaScript
        // object into JSON format (the reverse operation of what gson does on the server side).
        var myData = escape(JSON.stringify(songInputObj));
        var url = "webAPIs/insertSongAPI.jsp?jsonData=" + myData;
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

            document.getElementById("songNameError").innerHTML = jsonObj.songName;
            document.getElementById("creatorError").innerHTML = jsonObj.artist;
            document.getElementById("genreError").innerHTML = jsonObj.songGenre;
            document.getElementById("webUserPickListError").innerHTML = jsonObj.userEmail;
            document.getElementById("playlistPickListError").innerHTML = jsonObj.playlistName;

            if (jsonObj.errorMsg.length === 0) { // success
                jsonObj.errorMsg = "Record successfully inserted !!!";
            }
            document.getElementById("recordError").innerHTML = jsonObj.errorMsg;
        }
    };
    
    
    songCRUD.delete = function (songId, icon) {
        
        if (confirm("Do you really want to delete user " + songId + "? ")) {
            console.log("icon that was passed into JS function is printed on next line");
            console.log(icon);
            
            ajax("webAPIs/deleteSongAPI.jsp?deleteId=" + songId, onSuccess, icon);
            
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


    songCRUD.list = function (targetId) {

        var dataList = document.createElement("div");
        dataList.id = "dataList"; // set the id so it matches CSS styling rules in listStyle.css
        dataList.innerHTML = "<h2>Songs <img id='addUser' src='icons/insert.png' onclick='songCRUD.startInsert();'/> </h2>";
        dataList.innerHTML += "<h3 id='listMsg'></h3>";

        document.getElementById(targetId).innerHTML = "";
        document.getElementById(targetId).appendChild(dataList);

        ajax('webAPIs/listSongAPI.jsp', setListUI, 'listMsg');

        function setListUI(httpRequest) {

            console.log("starting songCRUD.list (setListUI) with this httpRequest object (next line)");
            console.log(httpRequest);

            var obj = JSON.parse(httpRequest.responseText);

            if (obj === null) {
                document.getElementById("listMsg").innerHTML = "songCRUD.list Error: JSON string evaluated to null.";
                return;
            }

            for (var i = 0; i < obj.songList.length; i++) {
            
                var id = obj.songList[i].songId;
                obj.songList[i].delete = "<img src='icons/delete.png'  onclick='songCRUD.delete(" + id + ",this)'  />";

            }

        // buildTable Parameters: 
        // First:  array of objects that are to be built into an HTML table.
        // Second: string that is database error (if any) or empty string if all OK.
        // Third:  reference to DOM object where built table is to be stored. 
            buildTable(obj.songList, obj.dbError, dataList);
        }
    };

}());  // the end of the IIFE

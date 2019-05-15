function findPlaylistFn(id) {

    ajax("webAPIs/getPlaylistByIdAPI.jsp?id=" + id, displayPlaylist, "playlistInfoHere");

    function displayPlaylist(httpRequest) {
        var target = document.getElementById("playlistInfoHere");
        target.innerHTML = "";
        var obj = JSON.parse(httpRequest.responseText);
        if (obj.playlistList.length === 0) {
            target.innerHTML = "There is no playlist with id '" + id + "' in the database";
        } else if (obj.playlistList[0].errorMsg.length > 0) {
            target.innerHTML = "Error extracting the Web User from the database: " + obj.playlistList[0].errorMsg;
        } else {
            target.innerHTML = "<h4>Playlist Profile</h4>";
            target.innerHTML += "Playlist Id: " + obj.playlistList[0].playlistId;
            target.innerHTML += "<br/>User Email: " + obj.playlistList[0].name;
            target.innerHTML += "<br/>Birthday: " + obj.playlistList[0].creator;
            target.innerHTML += "<br/>Membership Fee: " + obj.playlistList[0].genre;
            target.innerHTML += "<br/>Role Id: " + obj.playlistList[0].dateUploaded;
            target.innerHTML += "<br/>Thumbnail: " + obj.playlistList[0].thumbnail;
        }
    }
}



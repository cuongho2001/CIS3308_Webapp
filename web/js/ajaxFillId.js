// Make an ajax call to the given url. Then, once the call has been made 
// (and data is available), place the response text from the ajax call into the 
// inner html property of the DOM elemennt with the given id.
function ajaxFillId(url, id) {

    // The httpReq Object is now local to function "ajaxCall" (not global)
    var httpReq;
    if (window.XMLHttpRequest) {
        httpReq = new XMLHttpRequest();  //For Firefox, Safari, Opera
    } else if (window.ActiveXObject) {
        httpReq = new ActiveXObject("Microsoft.XMLHTTP");    //For IE 5+
    } else {
        alert('ajax not supported');
    }

    console.log("ready to get content " + url);
    httpReq.open("GET", url); // specify which page you want to get


    // Ajax calls are asyncrhonous (non-blocking). Specify the code that you 
    // want to run when the response (to the http request) is available. 
    httpReq.onreadystatechange = function () {

        // readyState == 4 means that the http request is complete
        if (httpReq.readyState === 4) {
            if (httpReq.status === 200) {
                document.getElementById(id).innerHTML = httpReq.responseText;
            } else {
                // First use of property creates new (custom) property
                document.getElementById(id).innerHTML = "Error (" +
                        httpReq.status + " " + httpReq.statusText +
                        ") while attempting to read '" + url + "'";
            }
        }
    };  // end of anonymous function

    httpReq.send(null); // initiate ajax call

} // end function ajaxFillId
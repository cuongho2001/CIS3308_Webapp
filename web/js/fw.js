

/*var fw = {}; // globally available object


(function () {  // This is an IIFE, an Immediately Invoked Function Expression
    //alert("I am an IIFE!")
    
        var $ = function (idName) {
		return document.getElementById(idName);
	};

	fw.createFilter = function (targetId, filterId, tableId, columnNum) {
            
            var filt = document.createElement("div");
            filt.innerHTML = "<input type='text' id='filterId' onkeyup='find(" + filterId +", "+ tableId +", "+ columnNum +")' placeholder='Search for...'>";
            
            $(targetId).appendChild(filt);
            // create a filter with passed in filterId (Id of the input box) and tableId (which table it is filtering) and num (filter by which column)	
	};


        fw.find = function (filterId, tableId, columnNum) {
                

                // Declare variables 
                    var input, filter, table,    tr, td, i, txtValue;


                    input = $(filterId);
                    filter = input.value.toUpperCase();         //convert filter value to all upper case to compare with other table data.
                    table = $(tableId);
                    tr = table.getElementsByTagName("tr");

                    // Loop through all table rows, and hide those who don't match the search query
                    for (i = 0; i < tr.length; i++) {
                        td = tr[i].getElementsByTagName("td")[columnNum];
                        if (td) {
                            txtValue = td.textContent || td.innerText;
                            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                tr[i].style.display = "";
                            } else {
                                tr[i].style.display = "none";
                            }
                        }    
                    }
	};
    
    

}());  // the end of the IIFE */


function MakeModalImg(Id, imageSrc) {            //image needs an ID to make it modal
        
            
        var container = document.getElementById(Id);

        // add a div that will hold the image

        // add image into the div & set the image's src attribute to the 1st picture in the list
        var myImage = document.createElement("img");
        container.append(myImage);
        myImage.id = "oriImg";
        myImage.src = imageSrc;
        myImage.class = "image";

        // add back button under the image (and space between buttons)
        var modal = document.createElement("div");
        container.append(modal);
        modal.id = "myModal";
        modal.class = "modal";
        
        modal.innerHTML = "<span class='close'>&times;</span> "
                + " <img class='modal-content' id='img01'> "
                + " <div id='caption'></div> ";
        


            // Get the image and insert it inside the modal - use its "alt" text as a caption
        var oriImg = $("oriImg");
            
        var modalImg = $("img01");
        var captionText = $("caption");
        
            oriImg.onclick = function() {
                modal.style.display = "block";
                modalImg.src = oriImg.src;
                captionText.innerHTML = oriImg.alt;
            };

            // Get the <span> element that closes the modal
            var closeSpan = document.getElementsByClassName("close")[0];

            // When the user clicks on <span> (x), close the modal
            closeSpan.onclick = function() { 
                modal.style.display = "none";
            };

        return container;
    };


/* function makeFramework() {
	var fw = {};

	// declare local method that returns a reference to the HTML element with given id
	var $ = function (idName) {
		return document.getElementById(idName);
	};
        
        
	fw.createFilter = function (targetId, filterId, tableId, columnNum) {
            
            var filt = document.createElement("div");
            filt.innerHTML = "<input type='text' id='filterId' onkeyup='find(" + filterId +", "+ tableId +", "+ columnNum +")' placeholder='Search for...'>";
            
            $(targetId).appendChild(filt);
            // create a filter with passed in filterId (Id of the input box) and tableId (which table it is filtering) and num (filter by which column)	
	};
        
        
        fw.find = function (filterId, tableId, columnNum) {
                

                // Declare variables 
                    var input, filter, table,    tr, td, i, txtValue;


                    input = $(filterId);
                    filter = input.value.toUpperCase();         //convert filter value to all upper case to compare with other table data.
                    table = $(tableId);
                    tr = table.getElementsByTagName("tr");

                    // Loop through all table rows, and hide those who don't match the search query
                    for (i = 0; i < tr.length; i++) {
                        td = tr[i].getElementsByTagName("td")[columnNum];
                        if (td) {
                            txtValue = td.textContent || td.innerText;
                            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                tr[i].style.display = "";
                            } else {
                                tr[i].style.display = "none";
                            }
                        }    
                    }
	};
        
        
        

	return fw;
} */
   



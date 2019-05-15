/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function MakeModalImg(Id, imageSrc) {            //image needs an ID to make it modal
        
        console.log(Id);
        var container = document.getElementById(Id);
        
        if (container) {
            console.log("yes");
        } else {
            console.log("not found");
        }

        // add a div that will hold the image

        // add image into the div & set the image's src attribute to the 1st picture in the list
        var myImage = document.createElement("img");
        myImage.id = "oriImg_" + imageSrc;
        myImage.className = "image";
        myImage.src = imageSrc;
        container.appendChild(myImage);


        // add back button under the image (and space between buttons)
        var modal = document.createElement("div");
        container.appendChild(modal);
        modal.id = "myModalfor_" + Id;
        modal.className = "modal";
        
        modal.innerHTML = "<span id ='closefor_" + Id + "' class='close'>&times;</span> "
                + " <img class='modal-content' id='img01_" + imageSrc + "' > ";
        


            // Get the image and insert it inside the modal - use its "alt" text as a caption
        var oriImg = document.getElementById("oriImg_" + imageSrc);
            
        var modalImg = document.getElementById("img01_" + imageSrc);
        
        oriImg.onclick = function() {
            modal.style.display = "block";
            modalImg.src = oriImg.src;
        };

        // Get the <span> element that closes the modal
        var closeSpan = document.getElementById("closefor_"+ Id);

        // When the user clicks on <span> (x), close the modal
        closeSpan.onclick = function() { 
            modal.style.display = "none";
        };

        return container;
    };


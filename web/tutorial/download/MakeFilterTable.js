/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function MakeFilterTable (divId, tableId, columnNum) {
    
    var container = document.getElementById(divId);
    var table = document.getElementById(tableId);
    
    var filterBox = document.createElement("input");
    container.appendChild(filterBox);
    filterBox.type="text";
    filterBox.id = "filterfor_" + tableId;
    filterBox.placeholder = "Search for...";
    filterBox.onkeyup = function(){
        find(filterBox.id, tableId, columnNum);
    };
    

    function find(filterId, tableId, columnNum) {
        var input, filter, table,  tr, td, i, txtValue;
        
        
        input = document.getElementById(filterId);
        filter = input.value.toUpperCase();         //convert filter value to all upper case to compare with other table data.
        table = document.getElementById(tableId);
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
    }
    
    return container;
}

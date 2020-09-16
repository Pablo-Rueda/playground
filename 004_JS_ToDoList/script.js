var numID = 0;
var tasks = 0;
document.getElementById("tasksComplete").innerHTML = tasks;

function reset(){
    tasks = 0;
    document.getElementById("tasksComplete").innerHTML = 0;
}
/* Add item button */
function addItem(){
    var  inputText = document.getElementById("text").value;   // take text element 
    if(inputText !== ""){
        numID = numID + 1;
        var elmIDs = "object" + numID;

        /* buttons */
        /* Create remove button */
        var  buttons = document.createElement("div");
        buttons.classList.add("secondary-content");
        buttons.classList.add("row");

            // Remove Icon
            var  remIcon = document.createElement("i");
            remIcon.classList.add("material-icons");
            remIcon.classList.add("left");
            var deleteText = document.createTextNode("delete");
            remIcon.appendChild(deleteText)
            // Button
            var  rem = document.createElement("a");          // create reference element
            rem.href="#";                                    // not a link
            rem.onclick = function(){
                var element = document.getElementById(elmIDs);
                element.parentNode.removeChild(element);
            };
            //rem.classList.add("secondary-content");          // Secondary content of list
            rem.classList.add("btn");                        // Button
            rem.classList.add("red");                        // color
            var remText = document.createTextNode("Remove");
            rem.appendChild(remText)
            rem.appendChild(remIcon)

            /* Create done button */
            // Remove Icon
            var  doneIcon = document.createElement("i");
            doneIcon.classList.add("material-icons");
            doneIcon.classList.add("left");
            var iconText= document.createTextNode("done");
            doneIcon.appendChild(iconText)
            // Button
            var  done = document.createElement("a");          // create reference element
            done.href="#";                                    // not a link
            done.onclick = function(){
                var element = document.getElementById(elmIDs);
                element.parentNode.removeChild(element);
                tasks = tasks +1;
                document.getElementById("tasksComplete").innerHTML = tasks;
            };
            //done.classList.add("secondary-content");          // Secondary content of list
            done.classList.add("btn");                        // Button
            done.classList.add("green");                        // color
            var doneText = document.createTextNode("Done");
            done.appendChild(doneText);
            done.appendChild(doneIcon);
        buttons.appendChild(done);
        buttons.appendChild(rem);
        /* Create list element */
        var  newLi = document.createElement("LI");         // create list element
        newLi.classList.add("collection-item");            // give a class style to list element
        var text = document.createTextNode(inputText);     // create new text node
        newLi.appendChild(text);                           // append text node to list element
        newLi.appendChild(buttons);
        newLi.id = elmIDs;
        document.getElementById("list").appendChild(newLi);// add new list element to list
    }
}

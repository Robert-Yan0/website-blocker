var close = document.getElementsByClassName("close");

document.getElementById("add_btn").addEventListener("click", addElement);

function addElement() {
    var li = document.createElement("li");
    var input_value = document.getElementById("todo_input").value;
    var t = document.createTextNode(input_value);
    li.appendChild(t);
    if(input_value === '') {
        //do nothing
    } else {
        document.getElementById("blocklist").appendChild(li);
    }
    document.getElementById("todo_input").value = "";

    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    close[close.length-1].addEventListener("click",function() {
        var div = this.parentElement;
        div.style.display = "none";
    });
}
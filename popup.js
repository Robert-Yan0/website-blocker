var banned_urls = [];

chrome.runtime.sendMessage(banned_urls);

chrome.runtime.onMessage.addListener(getMessage);

function getMessage(message, sender, sendResponse) {
    banned_urls = message;
    construct_list();
}

var close = document.getElementsByClassName("close");


function construct_list() {
    for(elem of banned_urls) {
        var li = document.createElement("li");
        var t = document.createTextNode(elem);
        li.appendChild(t);
        document.getElementById("blocklist").appendChild(li);
        attach_close_button(li);
        add_close_functionality();
    }
}


document.getElementById("add_btn").addEventListener("click", addElement);

function addElement() {
    //create element
    var li = document.createElement("li");
    var input_value = document.getElementById("todo_input").value;
    var t = document.createTextNode(input_value);
    li.appendChild(t);
    if(input_value === '') {
        //do nothing
    } else {
        document.getElementById("blocklist").appendChild(li);
        banned_urls.push(input_value);
    }
    document.getElementById("todo_input").value = "";
    attach_close_button(li);
    //x button functionality
    add_close_functionality();
}

function update_list() {
    chrome.runtime.sendMessage(banned_urls);
}

function add_close_functionality() {
    close[close.length-1].addEventListener("click",function() {
        var div = this.parentElement;
        div.style.display = "none";
        banned_urls.splice(close.length-1,1);
        update_list();
    });
}

function attach_close_button(li) {
    //create x button
    var span = document.createElement("span");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    update_list();
}
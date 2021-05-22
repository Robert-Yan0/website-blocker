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

function show_blocklist() {
    var div = document.getElementById("block_section");
    div.style.display = "block";    //shows the blocklist
}

function hide_blocklist() {
    console.log("blocklist hidden");
    var div = document.getElementById("block_section");
    div.style.display = "none";    //hide the blocklist
}

function show_timer() {
    var div = document.getElementById("timer_section");
    div.style.display = "block";
}

function hide_timer() {
    var div = document.getElementById("timer_section");
    div.style.display = "none";
}

function show_shop() {
    var div = document.getElementById("shop_section");
    div.style.display = "block";
}

function hide_shop() {
    var div = document.getElementById("shop_section");
    div.style.display = "none";
}

document.getElementById("blocklist_btn").addEventListener("click", function() {
    console.log("button clicked");
    show_blocklist();
    hide_timer();
    hide_shop();
});

document.getElementById("timer_btn").addEventListener("click", function() {
    console.log("button clicked");
    
    show_timer();
    hide_blocklist();
    hide_shop();
});

document.getElementById("shop_btn").addEventListener("click", function() {
    console.log("button clicked");
    
    show_shop();
    hide_blocklist();
    hide_timer();
});
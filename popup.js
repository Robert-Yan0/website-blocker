var countDownDate = 0;
var banned_urls = [];

var msg = {
    id: "get",
    banned_urls: banned_urls,
    end_time: countDownDate
};


chrome.runtime.sendMessage(msg);

chrome.runtime.onMessage.addListener(getMessage);

function getMessage(message, sender, sendResponse) {

    if(message.banned_urls.length) {
        banned_urls = message.banned_urls
        construct_list();
    }
    if(message.end_time) {
        countDownDate = message.end_time;
        start_timer();
    }
}


show_blocklist();
hide_shop();
hide_timer();

//---------------------------------------------------------- blocklist code


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
    msg.id = "update";
    msg.banend_urls = banned_urls;
    msg.end_time = countDownDate;
    chrome.runtime.sendMessage(msg);
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


var interval;

//---------------------------------------------------------- timer code

function start_timer() {
      
    document.getElementById("timer").innerHTML = "please wait...";
            // Update the count down every 1 second
            interval = setInterval(function() {
            
                // Get today's date and time
                var now = new Date().getTime();
            
                // Find the distance between now and the count down date
                var distance = countDownDate - now;
            
                // Time calculations for days, hours, minutes and seconds
                //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
                // Output the result in an element with id="demo"
                document.getElementById("timer").innerHTML = hours + "h "
                + minutes + "m " + seconds + "s ";
            
                // If the count down is over, write some text 
                if (distance < 0) {
                    clearInterval(interval);
                    interval = 0;
                    CountDownDate = 0;
                    document.getElementById("timer").innerHTML = "Timer Ended";
                }
            }, 1000);

    document.getElementById("timer_input").value = "";
}

document.getElementById("start").addEventListener("click",function(){
    console.log("button clicked");
    var timer_minutes = document.getElementById("timer_input").value;
    //fiddly code
    timer_minutes = parseInt(timer_minutes);
    if(parseInt(timer_minutes) === timer_minutes) {
        var d = new Date();
        var milliseconds = d.getTime();
        milliseconds = milliseconds + (timer_minutes * 60000);
        countDownDate = new Date(milliseconds).getTime();
        update_list();
        document.getElementById("timer").innerHTML = "please wait...";
        if(timer_minutes > 0 && timer_minutes < 1440) {
                // Update the count down every 1 second
                interval = setInterval(function() {
                
                    // Get today's date and time
                    var now = new Date().getTime();
                
                    // Find the distance between now and the count down date
                    var distance = countDownDate - now;
                
                    // Time calculations for days, hours, minutes and seconds
                    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                
                    // Output the result in an element with id="demo"
                    document.getElementById("timer").innerHTML = hours + "h "
                    + minutes + "m " + seconds + "s ";
                
                    // If the count down is over, write some text 
                    if (distance < 0) {
                        clearInterval(interval);
                        interval = 0;
                        CountDownDate = 0;
                        document.getElementById("timer").innerHTML = "Timer Ended";
                    }
                }, 1000);
        }
    }
    document.getElementById("timer_input").value = "";
    
});

document.getElementById("stop").addEventListener("click", function() {
    clearInterval(interval);
    interval = 0;
    countDownDate = 0;
    document.getElementById("timer").innerHTML = "Timer Ended";
});

function show_blocklist() {
    var div = document.getElementById("block_section");
    div.style.display = "block";    //shows the blocklist
}

function hide_blocklist() {
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
    show_blocklist();
    hide_timer();
    hide_shop();
});

document.getElementById("timer_btn").addEventListener("click", function() {
    
    show_timer();
    hide_blocklist();
    hide_shop();
});

document.getElementById("shop_btn").addEventListener("click", function() {
    
    show_shop();
    hide_blocklist();
    hide_timer();
});

document.getElementById("item1func").addEventListener("click", item1);
function item1() {
	console.log("click1");
}
	
document.getElementById("item2func").addEventListener("click", item2);
function item2() {
	console.log("click2");
}

document.getElementById("item3func").addEventListener("click", item3);
function item3() {
	console.log("click3");
}

document.getElementById("item4func").addEventListener("click", item4);
function item4() {
	console.log("click4");
}
	
document.getElementById("item5func").addEventListener("click", item5);
function item5() {
	console.log("click5");
}

document.getElementById("item6func").addEventListener("click", item6);
function item6() {
	console.log("click6");
}
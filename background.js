console.log("background script ran again ");
var banned_urls = [];
var end_time = 0;
var points = 0;
var timer_minutes = 0;

var msg = {
    banned_urls: banned_urls,
    end_time: end_time,
    points: points,
    timer_minutes: timer_minutes
};

chrome.runtime.sendMessage(msg);

chrome.runtime.onMessage.addListener(getMessage);


//I dont wanna talk about
function getMessage(message, sender, sendResponse) {
    if(message === "content" && msg.end_time != 0) {    //if timer hasn't started
        console.log("sent to content script")
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, msg.banned_urls);  
        });
    } else if(message.id === "get") {
        console.log("got get request");

        chrome.runtime.sendMessage(msg);
    } else if(message.id === "update"){ 

        if(message.banned_urls.length) {
            msg.banned_urls = message.banned_urls;
        }

        if(message.end_time) {
            msg.end_time = message.end_time;
        }
        if(message.timer_minutes) {
            msg.timer_minutes = message.timer_minutes;
        }
        msg.points = message.points;
    }
}



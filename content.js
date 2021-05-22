var msg = "content";
chrome.runtime.sendMessage(msg);

var banned_urls = [];
var url = window.location.href;
chrome.runtime.onMessage.addListener(getMessage);
function getMessage(message, sender, sendResponse) {
    console.log("got message");
    banned_urls = message;
    redirect();
}

redirect();

function redirect() {
    for(elem of banned_urls) {
        if(url === elem) {
            window.location.replace("https://en.wikipedia.org/wiki/Fortnite");
        }
    }
}
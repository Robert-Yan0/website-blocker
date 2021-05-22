console.log("background script ran again ");
var banned_urls = [];

chrome.runtime.onMessage.addListener(getMessage);

function getMessage(message, sender, sendResponse) {
    if(message === "content") {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, banned_urls);  
        });
    } else if(message.length) {
        banned_urls = message;

    } else {
        chrome.runtime.sendMessage(banned_urls);
    }
}



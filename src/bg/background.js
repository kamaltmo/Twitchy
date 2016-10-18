// if you checked "fancy-settings" in extensionizr.com, uncomment this lines



chrome.runtime.onInstalled.addListener(function(details){
	//on install setup default setting variables
    var hotKeyList = [];
    var userEmoteIDs = [];
    var userEmoteCodes = [];

    if(details.reason == "install"){

       chrome.storage.sync.set({ list: hotKeyList, keyStatus: true, topStatus: false, suggStatus: true, emoteIds: userEmoteIDs, emoteCodes: userEmoteCodes}, function(){;
    		console.log('Settings saved');
  		});
    }
});

 var settings = new Store("settings", {
     "sample_setting": "This is how you use Store.js to remember values"
 });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
});

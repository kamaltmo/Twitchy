/*
 *Javascript file for popup window, manages and reacts to user actions in this screen
 */

//Get toggle settings status and set them
chrome.storage.sync.get(['keyStatus','topStatus','suggStatus'], function(settings) {
                if(settings.keyStatus == true) {
                    document.getElementById("hotKeys").checked = true;
                }

                if(settings.topStatus == true) {
                    document.getElementById("top10").checked = true;
                } 

                if(settings.suggStatus == true) {
                    document.getElementById("sugg").checked = true;
                } 
});

//Change settings status when toggles are pressed
$(document).ready(function(){
    $('#hotKeys').change(function() {

        if (this.checked) {
            chrome.storage.sync.set({'keyStatus': true}, function(){;
                console.log('Key Status Updated');
            });
        } else {
            chrome.storage.sync.set({'keyStatus': false}, function(){;
                console.log('Key Status Updated');
            });
        }

        //Getting hotkey name from array

        // chrome.storage.sync.get("list", function(keys) {
        //         alert(keys.list[0].name);
        // });
    });

    $('#top10').change(function() {

        if (this.checked) {
            chrome.storage.sync.set({'topStatus': true}, function(){;
                console.log('Key Status Updated');
            });
        } else {
            chrome.storage.sync.set({'topStatus': false}, function(){;
                console.log('Key Status Updated');
            });
        }
    });

    $('#sugg').change(function() {

        if (this.checked) {
            chrome.storage.sync.set({'suggStatus': true}, function(){;
                console.log('Key Status Updated');
            });
        } else {
            chrome.storage.sync.set({'suggStatus': false}, function(){;
                console.log('Key Status Updated');
            });
        }
    });

    $("#options").click(function() {
        chrome.runtime.openOptionsPage();
    });
});
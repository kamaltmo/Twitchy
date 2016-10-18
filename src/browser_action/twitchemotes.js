$( document ).ready(function() {

$('#emoteLoader').hide();
var list = [];
var emotesIDs = [];
var emotesCodes = [];
var useEmotes = false;
var textarea = $('#HotTextDiv');
var textarea1 = $('#RandTextDiv');
textarea.show();
textarea1.hide();

$('.grid').masonry({
  columnWidth: 103,
  itemSelector: '.grid-item'
});


//GET ALL THE THINGS! (╯°□°）╯︵ ┻━┻
chrome.storage.sync.get(['list','emoteIds', 'emoteCodes','useEmotes'], function(data) {
  list = data.list;
  emotesIDs = data.emoteIds;
  emotesCodes = data.emoteCodes;
  useEmotes = data.useEmotes;

  //Loop through the list of hot keys in the system and add them to the table
  for (i = 0; i < list.length; i++) { 
    $("#KeyList").append("<tr><td><b>"+list[i].name+"</b></td><td><i>"+list[i].keys+"</i></td><td><a id='"+i+"' class='btn btn-block btn-danger btn-xs'>Delete</a></td></tr>");
  }

  if (!useEmotes) {
    //Get Default emotes if user has not connected twitch acount
    $.getJSON("https://twitchemotes.com/api_cache/v2/global.json", function(data) {
      var count = 0;
      
      Object.keys(data.emotes).forEach(function(current_emote, index, initial_array) {
      
        //alert(current_emote); //Emote Name
        //alert(data.emotes[current_emote].image_id); //Image ID
        count = count + 1;
        
        $( ".grid" ).append( '<div class="grid-item"><img src="https://static-cdn.jtvnw.net/emoticons/v1/'+data.emotes[current_emote].image_id+'/1.0" id="'+current_emote+'" ></div>' );
      });
    });
  } else  {
    //get the users specific emote list
    for (var i = 0; i < emotesIDs.length; i++) {
      $( ".grid" ).append( '<div class="grid-item"><img src="https://static-cdn.jtvnw.net/emoticons/v1/'+emotesIDs[i]+'/1.0" id="'+emotesCodes[i]+'" ></div>' );
    };
  }

});

$('body').on('click','img',function(){

	document.getElementById("HotText").value += " "+event.target.id;
	document.getElementById("RandText").value += " "+event.target.id+",";

});

$('#selectType').change(function(){

	    
        var select = $(this).val();

        if (select == '1'){
          document.getElementById("HotText").value = "";
          document.getElementById("RandText").value = "";
          textarea.show();
          textarea1.hide();
        }
        
        if (select == '2'){
          document.getElementById("HotText").value = "";
          document.getElementById("RandText").value = "";
          textarea1.show();
          textarea.hide();
        }
});


$("#recordClicks").click(function() {
	$("#recordClicks").addClass("disabled");
        Mousetrap.record(function(sequence) {
            // sequence is an array like ['ctrl+k', 'c']
            //alert('You pressed: ' + sequence.join(' '));

            document.getElementById("inKeys").value = sequence.join(' ');
        });
        $("#recordClicks").removeClass("disabled");
    });

//On clicking a delete button remove the element from chrome storage array and update the array;
$('body').on('click','a',function(){
  var id = $(this).attr('id');
  if (!isNaN(id)) {

          list.splice(id, 1);
          chrome.storage.sync.set({'list': list}, function(){;
              console.log('Key List Updated');
              location.reload();
          });
  }

});

//On clicking the add button add the entry to the chrome storage array;
$('body').on('click','button',function(){
  

  if($("#inKeys").val() == "") {
    alert("Please Record A Hot Key");
  } else if ($("#keysName").val().trim() == "")  {
    alert("Please Enter A Name");
  } else {

    if ($("#selectType").val() == 1) {

      if($("#HotText").val().trim() == "") {
        alert("Please Enter Text");
      } else {
        //Add a normal hot key to the list

          var hotKey = {};
          hotKey["name"] = $("#keysName").val();
          hotKey["keys"] = $("#inKeys").val();
          hotKey["type"] = 1;
          hotKey["contents"] = $("#HotText").val();
          hotKey["dLenght"] = 0;

          //MOVE TO SINGLE maybe
          //chrome.storage.sync.get("list", function(keys) {
              
              //Push new key to old list and update storage
              list.push(hotKey);

              chrome.storage.sync.set({'list': list}, function(){;
                  console.log('Key List Updated');
                  location.reload();
              });
          //});

          location.reload();
      }
    } else {

        if($("#RandText").val().trim() == "") {
          alert("Please Enter Text");
        } else if($("#myNumber").val() < 1) {
          alert("Lenght Must Be Aleast 1");
        } else  {
          //Add a randomizer hot key to the list

          var hotKey = {};
          hotKey["name"] = $("#keysName").val();
          hotKey["keys"] = $("#inKeys").val();
          hotKey["type"] = 2;
          hotKey["contents"] = $("#RandText").val();
          hotKey["dLenght"] = $("#myNumber").val();

              
              //Push new key to old list and update storage
              list.push(hotKey);

              chrome.storage.sync.set({'list': list}, function(){;
                  console.log('Key List Updated');
                  location.reload();
              });

          location.reload();
        }
    }
  }

});


function getUserEmotes(oauth) {
    var clientid = '';
    var userEmoteIDs = [];
    var userEmoteCodes = [];

    $('#getEmotes').hide();
    $('#noEmotes').hide();
    $('#emoteLoader').show();

    TAPIC.setup(clientid, oauth, function (username) {
    var channel = username;
    TAPIC.joinChannel(channel, function () {

      //If success full, get username and emoteset
    console.log( 'getUsername: ' + TAPIC.getUsername() );

      $.getJSON("https://api.twitch.tv/kraken/chat/emoticon_images?emotesets="+TAPIC.getEmoteSets()+"&oauth_token="+oauth, function(data) {

          
          var count = 0;

          Object.keys(data.emoticon_sets).forEach(function(currentSet, index, initial_array) {

            //loop through each emote set and add the emotes to an emote list array
            for (var i = 0; i < data.emoticon_sets[currentSet].length; i++) {
              if(!/[^a-zA-Z0-9]/.test(data.emoticon_sets[currentSet][i].code)) {
                userEmoteIDs[count] = data.emoticon_sets[currentSet][i].id;
                userEmoteCodes[count] = data.emoticon_sets[currentSet][i].code;
                count = count + 1;
              }
            };
          });

          chrome.storage.sync.set({'useEmotes': true, 'emoteIds': userEmoteIDs, 'emoteCodes': userEmoteCodes}, function(){;
                $('#getEmotes').show();
          $('#noEmotes').show();
          $('#emoteLoader').hide();
          location.reload();
                console.log('Emotes Updated');
          });

          
      });
    });
  });
}


$('#getEmotes').on("click",function(){
  if($("#oaKey").val().trim() == "") {
    alert("You Must Enter an OAuth to use this feature");
  } else  {
    //remove 'oauth:' if in string
    var oaKey = $("#oaKey").val().trim();
    oaKey = oaKey.replace('oauth:','');
    //Attempt to get emotes
    getUserEmotes(oaKey);
  }
})

});
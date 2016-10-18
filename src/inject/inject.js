chrome.storage.sync.get("list", function(keys) {
    //Loop through the list of hot keys in the system and add them to the table
    for (i = 0; i < keys.list.length; i++) {

        //Hotkey command
        Mousetrap.bind(keys.list[i].keys, function(e, combo) {
            $(".js-chat_input.chat_text_input.mousetrap.ember-view.ember-text-area").each(function() {

                var chat = this;
                //Check if hotkeys are on and found
                chrome.storage.sync.get("keyStatus", function(status) {
                    if (status.keyStatus == true) {

                        chrome.storage.sync.get("list", function(keysLive) {

                                var list = keysLive.list;
                                var found = false;

                                //Find which event
                                for (var k = 0; k < list.length; k++) {
                                    if (combo == list[k].keys) {
                                        found = true;
                                        break;
                                    }
                                };

                                if (found == true) {
                                    var text = " " + list[k].contents;
                                    var type = list[k].type;
                                    var num = list[k].dLenght;

                                    if (type == 2) {
                                        var textArray = (text.trim()).split(",");
                                        var newText = "";
                                        for (j = 0; j < num; j++) {
                                            newText = newText.concat(" ");
                                            newText = newText.concat(textArray[Math.floor(Math.random() * textArray.length)]);
                                        }
                                        text = newText;
                                    }

                                    chat.value = (chat.value + text);
                                    //moves the curse focus to the end of the textarea
                                    chat.focus();
                                }     
                        });
					}
                });
            });
        });
    }
});

chrome.storage.sync.get(['suggStatus', 'emoteCodes'], function(status) {
        if (status.suggStatus == true) {

            if(!(status.emoteCodes.length > 0)) {
                status.emoteCodes = ["4Head","AMPEnergy","AMPEnergyCherry","AMPTropPunch","ANELE","ArgieB8","ArsonNoSexy","AsianGlow","AthenaPMS","BabyRage","BatChest","BCouch","BCWarrior","BibleThump","BigBrother","BlargNaut","bleedPurple","BloodTrail","BORT","BrainSlug","BrokeBack","BudBlast","BuddhaBar","BudStar","ChefFrank","cmonBruh","CoolCat","copyThis","CorgiDerp","CurseLit","DAESuppy","DansGame","DatSheffy","DBstyle","deIlluminati","DendiFace","DogFace","DoritosChip","duDudu","DxAbomb","DxCat","EagleEye","EleGiggle","FailFish","FPSMarksman","FrankerZ","FreakinStinkin","FUNgineer","FunRun","FutureMan","GingerPower","GivePLZ","GOWSkull","GrammarKing","HassaanChop","HassanChop","HeyGuys","HotPokket","HumbleLife","imGlitch","ItsBoshyTime","Jebaited","JKanStyle","JonCarnage","Kappa","KappaClaus","KappaPride","KappaRoss","KappaWealth","Keepo","KevinTurtle","KingMe","Kippa","Kreygasm","KAPOW","Mau5","mcaT","MikeHogu","MingLee","MrDestructoid","MVGame","NervousMonkey","NinjaTroll","NomNom","NoNoSpot","NotATK","NotLikeThis","OhMyDog","OMGScoots","OneHand","OpieOP","OptimizePrime","OSfrog","OSkomodo","OSsloth","panicBasket","PanicVis","PartyTime","pastaThat","PeoplesChamp","PermaSmug","PeteZaroll","PeteZarollTie","PicoMause","PipeHype","PJSalt","PJSugar","PMSTwin","PogChamp","Poooound","PraiseIt","PRChase","PrimeMe","PunchTrees","PuppeyFace","RaccAttack","RalpherZ","RedCoat","ResidentSleeper","riPepperonis","RitzMitz","RuleFive","SeemsGood","ShadyLulu","ShazBotstix","SmoocherZ","SMOrc","SoBayed","SoonerLater","SSSsss","StinkyCheese","StoneLightning","StrawBeary","SuperVinlin","SwiftRage","TakeNRG","TBCheesePull","TBTacoLeft","TBTacoRight","TF2John","TheRinger","TheTarFu","TheThing","ThunBeast","TinyFace","TooSpicy","TriHard","TTours","twitchRaid","TwitchRPG","UleetBackup","UncleNox","UnSane","VoHiYo","VoteNay","VoteYea","WholeWheat","WTRuck","WutFace","YouWHY"];
            }

            $(".js-chat_input.chat_text_input.mousetrap.ember-view.ember-text-area").textcomplete([
                { // tech companies
                    id: 'tech-companies',
                    words: status.emoteCodes,
                    match: /\b(\w{2,})$/,
                    search: function (term, callback) {
                        term = term.toLowerCase();
                        callback($.map(this.words, function (word) {
                            return word.toLowerCase().indexOf(term) === 0 ? word : null;
                        }));
                    },
                    index: 1,
                    replace: function (word) {
                        return word + ' ';
                    }
                }
            ], {
                onKeydown: function (e, commands) {
                    if (e.keyCode == 39) { // CTRL-J
                        return commands.KEY_ENTER;
                    }
                }
            });
        }
}); 
	

chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);


	}
	}, 10);

});

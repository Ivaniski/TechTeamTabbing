// background.js

// creates the audio object
var myPing = new Audio();
var myTeam = new Audio();
// source directory of audio file        
myPing.src = "ping.mp3"; 
myTeam.src = "TechTeam.mp3";


function mute_toggle(tab){
	chrome.tabs.update(tab.id,
        {muted: !tab.mutedInfo.muted});
}

chrome.commands.onCommand.addListener(function(command){
    
    if( command == "mute_tab" ){
	    // get selected tab
        chrome.tabs.getSelected(null, tab => {
		    // update tab to = mute
		    mute_toggle(tab);
		    // ping when toggled
		    myPing.play();
		});	
    }

    if( command == "mute_tabs" ){
    	// get all tabs
        chrome.windows.getAll({populate: true}, function(windows){
            windows.forEach(function (window){
                window.tabs.forEach(function (tab){
                	// check sound
                    if(tab.audible) {
                    	// update tab to = mute
                        mute_toggle(tab);
                        // ping when toggled
		                myPing.play();
                    }
                });
            });
        });
    }

    if( command == "mute_unselected_tabs" ){
        chrome.windows.getAll({populate: true}, function(windows){
            windows.forEach(function (window){
                window.tabs.forEach(function (tab){
                	// check sound
                    if(tab.audible) {
                    // check selected tab
                    	if(!tab.selected){
                    		// update tab to = mute
                    		mute_toggle(tab);
                    		// ping when toggled
		                    myPing.play();
                    	}    
                    }
                });
            });
        });
    }

    if( command == "tech_team" ){
		myTeam.play();
	}

});

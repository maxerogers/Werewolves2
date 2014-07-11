function getData(input){
	//returns input
	var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
	if ( app ) {
	    // PhoneGap application
	} else {
	    // Web page
	    var json = jQuery.parseJSON(document.cookie);
	    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) 
		{
		  return json[input.toLowerCase()];         
		}
		return json[input];
	}
}
function saveData(key,input){
	//saves input
	var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
	if ( app ) {
	    // PhoneGap application
	} else {
	    // Web page
	    var json = jQuery.parseJSON(document.cookie);
		json[key] = input;
		document.cookie = JSON.stringify(json);
	}
}
function clearData(){
	var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
	if ( app ) {
	    // PhoneGap application
	} else {
	    // Web page
	    document.cookie = "";
	}
}

function GetURLParameter(sParam)
{
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++)
	{
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam)
		{
			return sParameterName[1];
		}
	}
}
// Enable pusher logging - don't include this in production
Pusher.log = function(message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};

var pusher = new Pusher('8c0bcee100b50a1d7826');
$(function() {
	//var id = GetURLParameter("id");
	var json = {};
	var obj = {};
	json.id = GetURLParameter("id");
	$.ajax({
		url: "http://localhost:9393/game",
		type: "GET",
		dataType: "jsonp",
		data: json,
		contentType: 'application/json',
		accepts: "application/json",
		success: function(response){ 
			obj = JSON.parse(response);
			$("#title").html(obj.name);
			$("#status").html("Status:"+obj.status);
		}
	});

	$.ajax({
		url: "http://localhost:9393/game_players",
		type: "GET",
		dataType: "jsonp",
		data: json,
		contentType: 'application/json',
		accepts: "application/json",
		success: function(response){ 
			obj = JSON.parse(response);
			for(var i=0;i<obj.length;i++){
				$("#players").append("<h3>"+obj[i]["name"]+"</h3>");
			}
		}
	});

	$("#invite_btn").click(function(){
		$("#invite_form").css("display","inline");
		$("#invite_btn").css("display","none");
	});
	$("#invite_form_btn").click(function(){
		$("#invite_form").css("display","none");
		$("#invite_btn").css("display","inline");
	});
	$("#join_btn").click(function(){
		$("#leave_btn").css("display","inline");
		$("#join_btn").css("display","none");
		var cookie_json = JSON.parse(document.cookie);
		addUserToGame(cookie_json.id);
	});
	$("#leave_btn").click(function(){
		$("#join_btn").css("display","none");
		$("#leave_btn").css("display","inline");
	});
});

function addUserToGame(id){
	console.log(id);
	var json = {};
	json.id = GetURLParameter("id");
	json.player_id = id;
	$.post("http://localhost:9393/add_user_to_game", json , function(response){
		console.log(response);
	});
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
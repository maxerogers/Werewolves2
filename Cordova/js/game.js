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
		addUserToGame(getData("id"));
	});
	$("#leave_btn").click(function(){
		$("#join_btn").css("display","inline");
		$("#leave_btn").css("display","none");
		removeUserFromGame(getData("id"));
	});

	$("#chat_btn").click(function(){
		var json = {};
		json.game_id = GetURLParameter("id");
		json.user_id = getData("id");
		json.data = $("#chat_box").val();
		$.post("http://localhost:9393/chat",json, function(data){
			console.log(data);
		});
	});
	var channel = pusher.subscribe('test_channel_'+GetURLParameter("id"));
	channel.bind('my_event', function(data) {
		console.log(data);
		$("#chat_log").append("<p><strong>"+data.username+":</strong> "+data.message+"</p>");
	});
});

function addUserToGame(id){
	var json = {};
	json.id = GetURLParameter("id");
	json.player_id = id;
	$.post("http://localhost:9393/add_user_to_game", json , function(response){
		location.reload();
	});
}

function removeUserFromGame(id){
	var json = {};
	json.id = GetURLParameter("id");
	json.player_id = id;
	$.post("http://localhost:9393/remove_user_to_game", json , function(response){
		location.reload();
	});
}
$(function() {
	//var id = GetURLParameter("id");
	var json = {};
	var obj = {};
	json.id = GetURLParameter("id");

	$.get("http://localhost:9393/game",json, function(response){
		obj = JSON.parse(response);
			$("#title").html(obj.name);
			$("#status").html("Status:"+obj.status);
	});

	$.get("http://localhost:9393/game_players",json, function(response){
		obj = JSON.parse(response);
			for(var i=0;i<obj.length;i++){
				console.log(obj[i]);
				$("#players").append("<h3><a href=\"profile.html?id="+obj[i]["id"]+"\">"+obj[i]["username"]+"</a></h3>");
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
		addUserToGame();
	});
	$("#leave_btn").click(function(){
		$("#join_btn").css("display","inline");
		$("#leave_btn").css("display","none");
		removeUserFromGame();
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

function addUserToGame(){
	var json = {};
	json.player_id = getData("id");
	$.post("http://localhost:9393/game/"+GetURLParameter("id")+"/join_game", json , function(response){
		location.reload();
	});
}

function removeUserFromGame(){
	var json = {};
	json.player_id = getData("id");
	$.post("http://localhost:9393/game/"+GetURLParameter("id")+"/leave_game", json , function(response){
		location.reload();
	});
}
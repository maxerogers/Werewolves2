$(function() {

	function new_message(){
		console.log("NEW MESSAGE");
		$("#chat_log").animate(
			{ scrollTop: $("#chat_log")[0].scrollHeight
		},1000);
	}

	function recieve_new_message(){
		$("#chat_loading_gif").show();
		$.ajax({
			url: "http://localhost:9393/lobby_chat",
			type: "GET",
			dataType: "jsonp",
			contentType: 'application/json',
			accepts: "application/json",
			success: function(response){ 
				var messages = jQuery.parseJSON(response);
				$("#chat_log").empty();
				messages.forEach(function(message){
					$("#chat_loading_gif").hide();
					$("#chat_log").append("<p>"+message[0]+": "+message[1]+"</p>");
				});
				new_message();
			}
		});
	}

	$("#sign_out_btn").click(function(){
		var x = JSON.parse( document.cookie );
		$.post("http://localhost:9393/sign_out", x, function(response){
			document.cookie = response;
			window.location = "../index.html";
		});
	});	

	$("#new_game_form_btn").click(function(){
		$("#new_game_form").css("display","none");
		$("#new_game_btn").css("display","inline");
		var json = {}
		json.name = $("#new_game_input").val();
		json.gametype = $("#gametype_select").val();
		$.post("http://localhost:9393/new_game", json , function(response){
			location.reload();
		});
	});

	$("#new_game_btn").click(function(){
		$("#new_game_form").css("display","inline");
		$("#new_game_btn").css("display","none");
	});
	$("#players_loading_gif").show();
	$.ajax({
		url: "http://localhost:9393/online_users",
		type: "GET",
		dataType: "jsonp",
		contentType: 'application/json',
		accepts: "application/json",
		success: function(response){ 
			var users = jQuery.parseJSON(response);
			users.forEach(function(user){
				$("#players").append("<p><a href='/profile.html?id="+user[0]+"''>"+user[1]+"</a></p>");
			});
			$("#players_loading_gif").hide();
		}
	});
	$("#games_loading_gif").show();
	$.ajax({
		url: "http://localhost:9393/open_games",
		type: "GET",
		dataType: "jsonp",
		contentType: 'application/json',
		accepts: "application/json",
		success: function(response){ 
			var games = jQuery.parseJSON(response);
			games.forEach(function(game){
				$("#games_loading_gif").hide();
				$("#game_list").append("<tr><td><a href=\"game.html?id="+game.id+"\">"+game.name+"</a></td><td>"+game.filled+"/"+game.limit+"</td><td>Werewolves</td></tr>");
			});
		}
	});

	$("#chat_loading_gif").show();
	$.ajax({
		url: "http://localhost:9393/lobby_chat",
		type: "GET",
		dataType: "jsonp",
		contentType: 'application/json',
		accepts: "application/json",
		success: function(response){ 
			var messages = jQuery.parseJSON(response);
			messages.forEach(function(message){
				$("#chat_loading_gif").hide();
				$("#chat_log").append("<p>"+message[0]+": "+message[1]+"</p>");
			});
			new_message();
		}
	});

	var $selector = $('#new_game_input');

    // Prevent double-binding
    // (only a potential issue if script is loaded through AJAX)
    $(document.body).off('keyup', $selector);

    // Bind to keyup events on the $selector.
    $(document.body).on('keyup', $selector, function(event) {
      if(event.keyCode == 13) { // 13 = Enter Key
        if($("#new_game_input").val()){
            $("#new_game_form").css("display","none");
			$("#new_game_btn").css("display","inline");
			var json = {}
			json.name = $("#new_game_input").val();
			$.post("http://localhost:9393/new_game", json , function(response){
				location.reload();
			});
        }else{
            alert("Please enter your email and password");
        }
      }
    });

   	/*
	Pusher Messaging
   	*/
   	//Recieve Messages
   	var channel = pusher.subscribe('game_lobby');
	channel.bind('new_message', function(data) {
		console.log(data);
		$("#chat_log").append("<p><strong>"+data.username+":</strong> "+data.message+"</p>");
	});
	//Sending Message
	$("#chat_btn").click(function(){
		var json = {}
		json.username = getData("username");
		json.user_id = getData("id");
		json.game_id = 0;
		json.data = $("#chat_box").val();
		$.post("http://localhost:9393/lobby_chat", json, function(response){
			recieve_new_message();
			new_message();
		});
	});

    new_message();
});
$(function() {

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
		$.post("http://localhost:9393/new_game", json , function(response){
			location.reload();
		});
	});

	$("#new_game_btn").click(function(){
		$("#new_game_form").css("display","inline");
		$("#new_game_btn").css("display","none");
	});

	$.ajax({
		url: "http://localhost:9393/online_users",
		type: "GET",
		dataType: "jsonp",
		contentType: 'application/json',
		accepts: "application/json",
		success: function(response){ 
			console.log(response);
			var users = jQuery.parseJSON(response);
			users.forEach(function(user){
				$("#players").append("<p>"+user.email+"</p>");
			});
		}
	});

	$.ajax({
		url: "http://localhost:9393/games",
		type: "GET",
		dataType: "jsonp",
		contentType: 'application/json',
		accepts: "application/json",
		success: function(response){ 
			var games = jQuery.parseJSON(response);
			games.forEach(function(game){
				$("#games").append("<p><a href=\"game.html?id="+game.id+"\">"+game.name+"</a></p>");
			});
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
});
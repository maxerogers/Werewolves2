$(function() {

	$("#sign_out_btn").click(function(){
		var x = JSON.parse( document.cookie );
		$.post("http://localhost:9393/sign_out", x, function(response){
			document.cookie = response;
			window.location = "../index.html";
		});
	});	

	$.ajax({
		url: "http://localhost:9393/online_users",
		type: "POST",
		dataType: "jsonp",
		contentType: 'application/json',
		accepts: "application/json",
		success: function(response){ 
			var users = jQuery.parseJSON(response);
			users.forEach(function(user){
				$("#players").append("<p>"+user.username+"</p>");
			});
		}
	});
});
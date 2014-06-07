$(function() {

	$("#sign_out_btn").click(function(){
		$.ajax({
			url: "http://localhost:9393/sign_out",
			type: "POST",
			contentType: "application/json"
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
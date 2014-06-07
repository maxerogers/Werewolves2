$(function() {
	//var id = GetURLParameter("id");
	var json = {};
	json.id = GetURLParameter("id");
	$.ajax({
		url: "http://localhost:9393/game",
		type: "GET",
		dataType: "jsonp",
		data: json,
		contentType: 'application/json',
		accepts: "application/json",
		success: function(response){ 
			alert(response);
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
});

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
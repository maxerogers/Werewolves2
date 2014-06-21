$(function() {
	function signUp(){
		var json_builder = {};
			json_builder.email = $("#email_input").val();
			json_builder.password = $("#password_input").val();
			$.ajax({
				url: "http://localhost:9393/new_user",
				type: "GET",
				dataType: "jsonp",
				contentType: 'application/json',
				data: json_builder,
				accepts: "application/json",
				success: function(response){ 
					//TODO Save user information like API Key and UserID
					//alert(response);
					//Forward user to lobby
					if(response[0] === "Email already registred"){
						alert(response);
						document.cookie = response;
					}else{
						window.location = "../lobby.html";
						document.cookie = response;
					}
				}
			});
	}

	$("#signup_btn").click(function(){
		if($("#password_input").val() === $("#password_input2").val()){
			signUp();
		}else{
			alert("passwords don't match");
		}
	});

	var $selector = $('#password_input');

    // Prevent double-binding
    // (only a potential issue if script is loaded through AJAX)
    $(document.body).off('keyup', $selector);

    // Bind to keyup events on the $selector.
    $(document.body).on('keyup', $selector, function(event) {
      if(event.keyCode == 13) { // 13 = Enter Key
        if($("#password_input").val() !== 0 && $("#email_input").val() !== 0){
            signUp();
        }else{
            alert("Please enter your email and password");
        }
      }
    });
});
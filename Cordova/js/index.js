$(function() {
    function signIn(){
        var json_builder = {};
        json_builder.email = $("#email_input").val();
        json_builder.password = $("#password_input").val();
        $.ajax({
            url: "http://localhost:9393/login_user",
            type: "GET",
            dataType: "jsonp",
            contentType: 'application/json',
            data: json_builder,
            accepts: "application/json",
            success: function(response){
                if(response == "No Email Found"){
                    alert(response);
                }else if(response == "Bad Password"){
                    alert(response);
                }else{
                    //alert("logging in");
                    document.cookie = response;
                    window.location = "../lobby.html";
                }
            }
        });
    }

    $("#signin_btn").click(function(){
        if($("#password_input").val() !== 0 && $("#email_input").val() !== 0){
            signIn();
        }else{
            alert("Please enter your email and password");
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
            signIn();
        }else{
            alert("Please enter your email and password");
        }
      }
    });
});
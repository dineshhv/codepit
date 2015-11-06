var sessionID={};
$(document).foundation();
$(document).ready(function(){
	$('#submit').on('click',function(){
		var uname=$('#uname').val();
		var pword=$('#pword').val();
		var URL="/users/login"
		var request = $.ajax({
		  url: URL,
		  type: "POST",
		  data: { username : uname,password: pword},
		  dataType: "JSON"
		});
		 
		request.done(function( msg ) {
		  if(msg.errorCode==0)
		  {
		  	window.location="/dashboard"
		  	//console.log(msg)
		  }
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
	})

	
	
	loadAppinit();
})


function loadAppinit()
{
	var URL="/appInfo";
	var request = $.ajax({
			  url: URL,
			  type: "GET",
			  dataType: "JSON"
			});
			 
	request.done(function( msg ) {
		if(msg.errorCode==0)
		{
			 console.log(msg)
		}
	});
			 
	request.fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
}

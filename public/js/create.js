var sessionID={};
$(document).foundation();
$(document).ready(function(){
	
	$('#login #create').on('click',function(){
		var uname=$('#uname').val();
		var pword=$('#pword').val();
		var rpword=$('#rpword').val();
		var email=$('#email').val();
		var URL="/users/adduser";
		if(pword==rpword&&pword!='')
		{
			var request = $.ajax({
			  url: URL,
			  type: "POST",
			  data: { username : uname,password: pword,email:email},
			  dataType: "JSON"
			});
			 
			request.done(function( msg ) {
			  if(msg.errorCode==0)
			  {
			  	sessionID.UHash=msg.UHash;
			  	gmInitiate();
			  	
			  }
			});
			 
			request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});

		}
	})
	
	loadAppinit();
	
})

function gmInitiate()
{
	var URL="/users/profile";
	var request = $.ajax({
			  url: URL,
			  type: "POST",
			  data: { userHash : sessionID.UHash},
			  dataType: "JSON"
			});
			 
	request.done(function( msg ) {
		if(msg.errorCode==0)
		{
			 window.location="/dashboard"
		}
	});
			 
	request.fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
}
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

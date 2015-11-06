var sessionID={};
$(document).foundation();
$(document).ready(function(){
	
	$('#post #create').on('click',function(){
		var obj={}
		obj.postTitle=$('#title').val();
		obj.postContent=$('#notes').val();
		obj.postUrl=$('#webURL').val();
		obj.tags=$('#tags').val();
		var URL="/posts/addPost";
		payload=JSON.stringify(obj)
		if(obj.postTitle&&obj.postContent)
		{
			var request = $.ajax({
			  url: URL,
			  type: "POST",
			  data: payload,
			  dataType: "JSON",
			  contentType:"application/json"
			});
			 
			request.done(function( msg ) {
				if(msg.errorCode==0)
			  		Notify('Bot','Instruction Created Successfully','normal',true)
			  	else
			  		Notify('Bot Error','Instruction Failed: Session error','normal',true)
			});
			 
			request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});

		}
	})
	loadAppinit();
	appInitiate()
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
function appInitiate()
{
		var URL="/users/session";
		var request = $.ajax({
			  url: URL,
			  type: "GET",
			  dataType: "JSON"
			});
			 
			request.done(function( msg ) {
				if(msg.errorCode==0)
				{
					var URL="/board/info/"+msg.UHash;
					var request = $.ajax({
						url: URL,
						type: "GET",
						dataType: "JSON"
					});
						 
					request.done(function( msg ) {
						 if(msg.errorCode==0)
						 {
						 	$('.companyName').empty();
						 	$('.companyName').append(msg.response[0].profileName);
						 	$('.pbots').empty();
						 	$('.pbots').append("Instruction: "+resp.response[0].postCount);
						 }
					});
						 
					request.fail(function( jqXHR, textStatus ) {
						 alert( "Request failed: " + textStatus );
					});
				}
				else
				{
					console.log('session expired')
				}
			});
			 
			request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
		
}
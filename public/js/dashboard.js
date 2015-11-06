var sessionID={};
$(document).foundation();
$(document).ready(function(){
	loadAppinit();
	appInitiate();
	loadlist();
	$('.contentboard').on('click', '.bots',function(e){
		e.preventDefault();
		id=$(this).attr('id')
		window.location="/view/"+id
	})
})
function loadlist()
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
					
			var URL="/posts/all";
			var request = $.ajax({
					  url: URL,
					  type: "GET",
					  dataType: "JSON"
					});
					 
			request.done(function( resp ) {
				if(resp.errorCode==0)
				{	
					$('.contentboard').empty();
					$.each(resp.response,function(key,value){
						$('.contentboard').append(' <div class="small-2 large-12 columns bots" id="'+value._id+'"> <div class="small-2 large-1 columns "> <input id="checkbox1" type="checkbox"> </div> <div class="small-2 large-9 columns borderRight"> <div class="small-2 large-12 columns title nopadding"> <div class="small-2 large-9 columns text nopadding">'+value.postTitle+'</div> <div class="small-2 large-3 columns date nopadding"></div> </div> <div class="small-2 large-12 columns botcontent nopadding">'+value.postContent+'</div> </div> <div class="small-2 large-2 columns "> <div class="small-2 large-12 columns tags nopadding">'+value.tags+'</div> <div class="small-2 large-12 columns options nopadding">delete</div> </div> </div>')
					})
				}
				else
				{

				}
			});
					 
			request.fail(function( jqXHR, textStatus ) {
				alert( "Request failed: " + textStatus );
			});
		}
		else
		{
			window.location="/"
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
						 
					request.done(function( resp ) {
						 if(resp.errorCode==0)
						 {
						 	$('.pname').empty();
						 	$('.pname').append(resp.response[0].profileName);
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
					window.location="/"
				}
			});
			 
			request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
		
}
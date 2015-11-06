function Notify(title,msg,type,autoclose)
{
	var header=title||null;
	var content=msg||null;
	var popType=type||'normal';
	$('#notify').remove();
	$('#notify_Overlay').remove();

	if(popType=='model')
	{
		$( "body" ).append(' <div class="overlay" id="notify_Overlay"></div>');
	}
	else
	{
		
	}
	HTMLcontent='<div class="notify" id="notify"><div class="Notify_title">'+header+'</div><div class="textContent">';
	//HTMLcontent+=content+'</div>';
	HTMLcontent+=content+'</div>';
	$('#notify .textContent').empty();
	$('#notify .textContent').html(content)
	if(autoclose==false)
	{
		switch(popType)
		{
			case 'normal':
				HTMLcontent+='<div class="closeArea"><div class="popClose">Close</div></div>';
			break;
			case 'confirmation':
				HTMLcontent+='<div class="closeArea"><div class="popYes">Yes</div><div class="popNo">No</div></div>';
			break;		
		}
	}
	HTMLcontent+='</div>';
	$( "body" ).append(HTMLcontent);
	$('#notify .popYes').click(function(e){
		$('#notify').remove();
		$('#notify_Overlay').remove();
		confirm=true;
		return true;
	})
	$('#notify .popNo').click(function(e){
		$('#notify').remove();
		$('#notify_Overlay').remove();
		confirm=false;

		return false;
	})
	if(autoclose==true)
	{
		$('#notify').delay(2000).fadeOut( 1000, function() {
    		$('#notify_Overlay').remove();
  		});
	}
	$('#notify .popClose').click(function(){
		$('#notify').remove();
		$('#notify_Overlay').remove();
	})
}

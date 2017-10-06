$(document).ready(function(){

	$('body').click(function(){
		$('#basic-preview').slideUp('slow');
	});

	// For the div size to remain same, while the text size reduces
	$('.plan-header div').css('font-size', '1em');  
	while( $('.plan-header div').height() > $('.plan-header').height() ) {
		$('.plan-header div').css('font-size', (parseInt($('.plan-header div').css('font-size')) - 1) + "px" );
	}
	// 

});

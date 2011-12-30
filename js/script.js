/* ===========================================
   Author: Terrance Pitre
   =========================================== */

$(function(){
	
	// basic modal open/close
	$('.work-modal').click(function(e){
		 $('.modal').fadeIn();
		 $('.modal-bg').fadeIn();
		 e.preventDefault();
	});
	
	$('.modal .close, .modal-bg').click(function(e) {
		$('.modal').fadeOut();
		$('.modal-bg').fadeOut();
		e.preventDefault();
	})
	
	// add placeholder to browsers that don't recognize them
	if(!Modernizr.input.placeholder){
	
		$('[placeholder]').focus(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			}
		}).blur(function() {
			var input = $(this);
			if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		}).blur();
		$('[placeholder]').parents('form').submit(function() {
			$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
				}
			})
		});	
	}	

});
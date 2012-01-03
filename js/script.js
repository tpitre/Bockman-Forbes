/* ===========================================
   Bockman + Forbes Main JS
   Author: Terrance Pitre
   =========================================== */


	
var bf = {
	
	initFitText: function(){
	
		// fit text to box
		$('.box-content h2').fitText(1.4);
		
	},
	
	initCustomScroll: function(){
	
		// mousewheel horizontal scroll and add jScrollPane
		var $slides = $('.work-slides');
			
		$slides.jScrollPane({
			showArrows: true,
			autoReinitialise: true
		});
				
		var api = $slides.data('jsp'),
			throttleTimeout;
						  
		$(window).bind('resize', function(){
			if ($.browser.msie) {
				// IE fires multiple resize events while you are dragging the browser window which
				// causes it to crash if you try to update the scrollpane on every one. So we need
				// to throttle it to fire a maximum of once every 50 milliseconds...
				if (!throttleTimeout) {
					throttleTimeout = setTimeout(function(){
						api.reinitialise();
						throttleTimeout = null;
					},50);
				}
			} else {
				api.reinitialise();
			}
		});
		
		$slides.bind('mousewheel', function(e, delta) {	
			api.scrollByX(delta * 30);	
			e.preventDefault();	
		});			
	
	},
	
	viewWork: function(){
		
		var $workInfo = $('.work-info'),
			$workDetail = $('#work-detail');
			
		$('.box').click(function(e){
			$workDetail.animate({
				top: 0
			}, 1100, 'easeInOutQuint');
			
			$workInfo.delay(300).animate({
				right: 0
			}, 700, 'easeInOutQuint');
			
			e.preventDefault();
		});
		
		$('.close').click(function(e){
			 $workInfo.animate({
			 	right: -700
			 }, 700, 'easeInOutQuint');
			 
			 $workDetail.animate({
			 	top: -850
			 }, 1100, 'easeInOutQuint');
			 
			e.preventDefault();
		});
		
		$('.hide').click(function(e) {
			$(this).toggleClass('show');			
			$('.work-content').slideToggle();			
			e.preventDefault();
	    });
	    
	    $('.hide').toggle(
	    	function(){
	    		$workInfo.find('h1').animate({
	    			marginTop: -21,
	    			marginBottom: -20
	    		}, 400);
	    	},
	    	function(){
	    		$workInfo.find('h1').animate({
	    			marginTop: 18,
	    			marginBottom: -2
	    		}, 400);
	    	}				
	    );
	
	},
	
	addPlaceHolder: function(){
	
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
	
	}
	
}
	
$(function(){
	
	/* init all actions */
	
	bf.initFitText();
	bf.initCustomScroll();
	bf.viewWork();
	bf.addPlaceHolder();
		
});
		
	
	
		





	// activate slide show
//	$('.work-slides ul').after('<div class="slide-nav">').cycle({ 
//	    fx:     'fade',
//	    fit:	1,
//	    speed:  900, 
//	    timeout: 0,
//	    cleartypeNoBg: true,
//	    easing:		'easeInOutQuint',
//        next:   	'.next', 
//        prev:   	'.prev',
//	    pager:		'.slide-nav',
        // callback fn that creates a bullet to use as pager anchor 
//        pagerAnchorBuilder: function(idx, slide) { 
//            return '<a href="#">&bull;</a>'; 
//        } 
//	});

 //basic modal open/close
//$('.work-modal').click(function(e){
//	 $('.modal').fadeIn();
//	 $('.modal-bg').fadeIn();
//	 e.preventDefault();
//});
//
//$('.modal .close, .modal-bg').click(function(e) {
//	$('.modal').fadeOut();
//	$('.modal-bg').fadeOut();
//	e.preventDefault();
//})

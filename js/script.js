/* ===========================================
   Bockman + Forbes Main JS
   Author: Terrance Pitre
   =========================================== */


	
var bf = {
	
	// cache static elements used on load
	_e: {			
		workDetail: 	$('#work-detail'),
		figH2: 			$('.figcaption h2'),				
		figure:			$('.figure'),
		body:			$('body')
	},
	
	initFitText: function(){
	
		// fit text to figure
		this._e.figH2.fitText(1.4);
		
	},
	
	hoverSelect: function() {
		
		var $this = $(this);
		
		this._e.figure.mouseover(function(){
			$(this).removeClass('not-active').siblings().addClass('not-active');
		}).mouseleave(function() {
		    $(this).removeClass('not-active').siblings().removeClass('not-active');
		});	
	},	
	
	viewWork: function(){		
		
		// map to the main object
		var that = this;			
			
		this._e.figure.click(function(event){
			
			$.address.value($(this).attr('href'));
			
			// grab the data attribute and append the '.html'
			var data = $(this).data('fig') + '.html';						
			
			// remove the scrollbar by adding overflow: hidde to the container
			// TODO: get current scrollTop position and save it to reposition
			that._e.body.css('overflow', 'hidden');
			
			that._e.workDetail.load('includes/' + data, function(){
				
				var $workInfo = $('.work-info'),
					$workInner = $('.work-inner'),
					$workContent = $('.work-content'),
					$slides = $('.work-slides'),					
					$close = $('<a>').attr({
									class:	'close',
									href:	''
								}).text('x'),					
					$hide = $('<a>').attr({
									class:	'hide',
									href:	''
								}).text('Hide');
				
				// define functions to be initilalized after load
				(function(){
					
					// add close and minify buttons
					$workInner.prepend($hide).prepend($close);
					
					// mousewheel horizontal scroll and add jScrollPane
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
					
					$slides.bind('mousewheel', function(e, delta){	
						api.scrollByX(delta * 30);	
						event.preventDefault();	
					});
					
					// empty the portfolio container after its closed
					var emptyWork = function(){
					    that._e.workDetail.empty();
					};
					
					$close.click(function(event){		 
						 $workInfo.animate({
						 	right: -700
						 }, 700, 'easeInOutQuint', function(){
						 	emptyWork();
						 });
						 
						 that._e.workDetail.animate({
						 	top: -1100
						 }, 1100, 'easeInOutQuint', function(){
						 	emptyWork();
						 });
						 
						 that._e.body.css('overflow', 'visible');
						 event.preventDefault();
					});
					
					$hide.click(function(event){
						$(this).toggleClass('show');			
						$workContent.slideToggle();			
						
						event.preventDefault();
				    });
				    
				    $hide.toggle(
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
					
				})();							
				
				that._e.workDetail.animate({
					top: 0
				}, 1100, 'easeInOutQuint');
				
				$workInfo.delay(300).animate({
					right: 0
				}, 700, 'easeInOutQuint');				
	
			});	
			
			//event.preventDefault();
		});
		
		$.address.change(function(event) {
			console.log(event.value);
		});
	
	},
			
	addPlaceHolder: function(){
	
		// add placeholder to browsers that don't recognize them
		if(!Modernizr.input.placeholder){
		
			$('[placeholder]').focus(function(){
				var input = $(this);
				if (input.val() == input.attr('placeholder')){
					input.val('');
					input.removeClass('placeholder');
				}
			}).blur(function(){
				var input = $(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur();
			$('[placeholder]').parents('form').submit(function(){
				$(this).find('[placeholder]').each(function() {
					var input = $(this);
					if (input.val() == input.attr('placeholder')){
						input.val('');
					}
				})
			});	
		}
	
	}
	
}


$(function(){
	
	/* init actions */
	
	bf.initFitText();
	bf.hoverSelect();	
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
//$('.work-modal').click(function(event){
//	 $('.modal').fadeIn();
//	 $('.modal-bg').fadeIn();
//	 event.preventDefault();
//});
//
//$('.modal .close, .modal-bg').click(function(event) {
//	$('.modal').fadeOut();
//	$('.modal-bg').fadeOut();
//	event.preventDefault();
//})

/* ===========================================
   Bockman + Forbes Main JS
   Author: Terrance Pitre
   =========================================== */


	
var bf = {
	
	// cache static elements used on load				
	workDetail: 	$('#work-detail'),
	figH2: 			$('.figcaption h2'),				
	figure:			$('.figure'),
	html:			$('html'),
	main:			$('#main'),
	bg:				$('.bg'),
	
	introAnim: function(){
		
		//$(window).bind('resize', function(){
//			if (document.documentElement.clientWidth < 930) {
//				$('.figure').removeClass('end');
//				$('.figure:nth-child(3n)').addClass('end');
//			}
		//});
		
		var x = 0;
		
//		$('.figure').each(function(){
//			$(this).delay(x).css('visibility','visible').fadeTo('slow', 1000);			
//			x += 300;
//		});
	
	},
	
	initFitText: function(){
	
		// fit text to figure
		this.figH2.fitText(1.4);
		
	},
		
	viewWork: function(){		
		
		// map to the main object
		var that = this;			
		
		// load the external files	
		var loadURL = function(data) {	
			that.workDetail.load('includes/' + data  + '.html', function(){
				
				// cache those element selectors
				var $workInfo = $('.work-info'),
					$workInner = $('.work-inner'),
					$workContent = $('.work-content'),
					$inner = $('#profile .inner, #contact .inner, #press .inner'),
					$slides = $('.work-slides'),
					$close = $('<a>').attr({
									class:	'close',
									href:	'#/close'
								}).text('x'),					
					$hide = $('<a>').attr({
									class:	'hide',
									href:	'#/hide'
								}).text('Hide');
				
				// define functions to be initilalized after load
				(function(){
					
					$('.work-info h1').fitText(1);
					// add close and minify buttons
					$workInner.prepend($hide).prepend($close);
					$inner.prepend($close);
					
					// mousewheel horizontal scroll and add jScrollPane
					$slides.jScrollPane({
						showArrows: true,
						autoReinitialise: true
					});
					
					// if its the contact setion, init the map
					if (data === 'contact') that.initMap();
					
					var api = $slides.data('jsp'),
						throttleTimeout;
									  
					$(window).bind('resize', function(){
						if ($.browser.msie) {
							// IE fires multiple resize events while you are dragging the browser window which
							// causes it to crash if you try to update the scrollpane on every one. So we need
							// to throttle it to fire a maximum of once every 50 milliseconds...
							if (!throttleTimeout) {
								throttleTimeout = setTimeout(function(){
									if (api) api.reinitialise();
									throttleTimeout = null;
								},50);
							}
						} else {
							if (api) api.reinitialise();
						}
					});
					
					$slides.bind('mousewheel', function(event, delta){	
						api.scrollByX(delta * 30);	
						event.preventDefault();	
					});
					
					// empty the portfolio container after its closed
					var emptyWork = function(){
					    that.workDetail.empty();
					};
					
					// close the work section
					$('.close, .bg').click(function(event){	
						 
						 // suck that work section back in
						 var retractWork = (function() {					 	 
							 $workInfo.animate({
							 	right: -700
							 }, 700, 'easeInOutQuint', function(){
							 	emptyWork();
							 });
							 
							 that.workDetail.animate({
							 	top: -1100
							 }, 1000, 'easeInOutQuint', function(){
							 	emptyWork();
							 });
						})();	
						 
						// unlock scroll position
						var scrollPos = that.html.data('scroll-position');
						
						that.main.removeAttr('style');
						that.bg.fadeOut();							
						window.location.hash = '';						
						$('#main-nav li a').removeClass('selected');
						window.scrollTo(0, scrollPos);
										 
						event.preventDefault();
					});					
					
					$hide.click(function(event){
						$(this).toggleClass('show');			
						$workContent.slideToggle();			
						
						event.preventDefault();
				    });
				    
				    // toggle the work info section
				    $hide.toggle(
				    	function(){
				    		$workInfo.find('h1').animate({
				    			marginTop: -23,
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
				
				// animate the work section down
				var showWork = (function() {
					that.workDetail.animate({
						top: 0
					}, 1000, 'easeInOutQuint');
					
					$workInfo.delay(300).animate({
						right: 0
					}, 700, 'easeInOutQuint');
				})();
				
				if (document.documentElement.clientWidth < 720) {
					$('html, body').animate({ scrollTop: 0 }, 'fast');
				}			
	
			});
			
		}
		
		// do some stuff in the background for each gallery load
		var bgActions = function() {
			var scrollPos = self.pageYOffset || document.documentElement.scrollTop;
			that.bg.fadeIn();					
			that.main.css({'position' : 'fixed', 'top' : -scrollPos});
			that.html.data('scroll-position', scrollPos);
			console.log('here?');
		};
							
		// initialize address and pass in the event value
	    $.address.init().change(function(event) {
	    	var data = event.value.replace(/^\//, '');	    	
	    	
	    	// if a gallery is already displayed, make sure to play
	    	// that animation out before displaying the next one
	    	if (data) {	    	
			    if ($('#work-detail').length > 0) {				    	
			    	$('.work-info').animate({
			    		right: -700
			    	}, 700, 'easeInOutQuint', function(){
			    		that.workDetail.empty();
			    	});
			    	
			    	that.workDetail.animate({
			    		top: -700
			    	}, 1100, 'easeInOutQuint', function(){
			    		that.workDetail.empty();
			    		loadURL(data);
			    		bgActions();
			    	});			    	
			    }
			    else {			    	
		    		loadURL(data);
		    		bgActions();	    	
		    	}
		    }
	    });
	    	
	},
	
	hightlightNav: function(){
	
		var path = location.hash.substring(2),
			$navLink = $('#main-nav li a');
		
		if (path) {
			$('#main-nav li a[href$="' + path + '"]').attr('class', 'selected');
		}
		
		$navLink.click(function(){
			$navLink.removeClass('selected');
			$(this).addClass('selected');
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
	
	},
	
	initMap: function(){
		
		// set up the map for the contact section
		var centerLng = new google.maps.LatLng(29.927667,-90.089398);
	    var myOptions = {
	      zoom: 15,
	      center: centerLng,
	      mapTypeId: google.maps.MapTypeId.ROADMAP
	    };
	    var map = new google.maps.Map(document.getElementById('map'),
	        myOptions);
	      
	    var markerLng = new google.maps.LatLng(29.927667,-90.080348);
	    var marker = new google.maps.Marker({
	      position: markerLng, 
	      map: map, 
	      title: "Bockman + Forbes Design"
		});
		
	}
	
}

$(function(){
	
	// init the functions
	bf.introAnim()
	bf.initFitText();
	bf.viewWork();
	bf.hightlightNav();
	bf.addPlaceHolder();		
	
});
		

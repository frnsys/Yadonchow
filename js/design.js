$(function() {

		$.initArrowFade = function() {

			var size = $('figure img').size();	// total number of figures (images)
			
			// set up hover reveal for buttons
			// not set up in css so that this works only for yes-js
			// only reveal if more than one image
			if ( size > 1 ) {
				$('.display').hover(
					function() {
						$(this).find('figure').find('.next, .prev').fadeIn('fast');
					},
					function() {
						$(this).find('figure').find('.next, .prev').fadeOut('fast');
					}
				);
			}
		}

		// stop figure animations
		$.stopAnimations = function(i,all) {
			$('figure img, figcaption').each(function() {
				if ( $(this).index() == i ) {
					if ( all == true ) { $(this).stop(true,true); }
				}
				else { $(this).stop(true,true); }
			});
		}

		// image slider
		$.initSlider = function() {

			var size = $('figure img').size();	// total number of figures
			var i = 0; // index variable
			var select_i = ''; // selector index variable

			// hide figures via js
			// so that no-js will still show them all
			$('figure img, figcaption').each(function() {
				$(this).hide();
			});

			
			// show the first image & caption
			$('figure img').eq(0).show();
			$('figcaption').eq(0).show();

			// spawn selector circles
			$('figure img').each(function() {
				$('.selector').append('<a href="#"></a>');
				$('.selector a').eq(0).addClass('active');
			});

			// next/past buttons
			$('.next, .prev').click(function() {
				$.stopAnimations(i,false);
	
				var past_image = $('figure img').eq(i);

				var past_caption = $('figcaption').eq(i);

				// lock-in height to prevent shifting
				$('figure').height(past_image.height() + past_caption.height());	

				// if a selector index is set, use that for i
				if ( select_i != '' ) {
					i = select_i;
				}

				if ( $(this).attr('class') == 'next' ) {
					if ( i+1 > size-1 ) { i = 0; }
					else { i++; }
				}
				else if ( $(this).attr('class') == 'prev' ) {
					if ( i-1 < 0 ) { i = size-1; }
					else { i--; }
				}

				// update selectors
				$('.selector a.active').removeClass('active');
				$('.selector a').eq(i).addClass('active');

				// get the slider top padding, for using when window width < 800
				var slider_top = $('.slider').css('padding-top');	
				var slider_top_val = parseInt(slider_top.substr(0,slider_top.length-2));

				// crossfade images & captions
				past_image.addClass('top').fadeOut();			
				$('figure img').eq(i).addClass('bottom').css('top',slider_top_val).fadeIn(500, function() {
					$('figcaption').eq(i).fadeIn('fast');					
					$(this).removeClass('bottom');
					past_image.removeClass('top');
					$('figure').css('height','auto');
				});
				past_caption.fadeOut();		

			});

			// selector buttons
			$('.selector a').live('click',function() {
				$.stopAnimations(i,true);
				select_i = $(this).index() - 1;
				if ( select_i + 1 < 0 ) { select_i = size - 1 }
				$('.next').click();
				// reset selector index
				select_i = '';
				return false;
			});

		}

		// on design main page
		// add pseudo linked-hovering between images and navigation links
		$.initHovers = function() {
			$('article').hover(
					function() {
						var href = $(this).parent().attr('href').replace(/\//g,"\\/");
						$('a[href='+href+']').addClass('pseudohover');
					},
					function() {
						var href = $(this).parent().attr('href').replace(/\//g,"\\/");					
						$('a[href='+href+']').removeClass('pseudohover');
					}
			);
			$('nav a').hover(
					function() {
						var href = $(this).attr('href').replace(/\//g,"\\/");		
						$('a[href='+href+'] article').addClass('pseudohover-img');				
					},
					function() {
						var href = $(this).attr('href').replace(/\//g,"\\/");										
						$('a[href='+href+'] article').removeClass('pseudohover-img');				
					}
			)
		}
		$.initHovers();

		// only initialize arrow fades if window is large enough
		if ( $(window).width() > 800 ) {
			$.initArrowFade();
		}
		$.initSlider();

		// responsive:
		// handle window resizing
		$(window).resize(function() {
			if ( $(window).width() < 800 ) {
				// stop the arrow slider buttons from fading
				$('.next, .prev').show();
				$('.display').unbind('hover');
			}
			else {
				$.initArrowFade();
			}
		});

});

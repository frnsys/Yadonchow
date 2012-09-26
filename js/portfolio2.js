$(function() {

	var index = 0,
			paused = false;

	// Show only the first project
	$('.project').addClass('off').eq(index).removeClass('off');
	$('.projects li').eq(index).addClass('selected');

	// Set height of #main
	$('#main').height( $('.project').eq(0).innerHeight() );

	// Set slider loop
	var cycle = setInterval( function() {
		if ( !paused ) {
			slide();
		}
	}, 6000);

	// Manually moving through slides
	$('.next').live('click', function() {
		paused = true;
		slide();
	});
	$('.prev').live('click', function() {
		paused = true;
		slide({ reverse: true });
	});

	$('#main').live('mouseenter', function() {
		$(this).find('.next, .prev').fadeIn();
	}).live('mouseleave', function() {
		$(this).find('.next, .prev').fadeOut();
	});

	$('.projects li').live('click', function() {
		paused = true;
		slide({ i: $(this).index() });
	});

	// Slide
	function slide( options ) {
		options = options || {};
		var dir = options.reverse ? '100' :  '-100';

		$('.projects li').eq(index).removeClass('selected');
		$('.project').eq(index).addClass('on').animate({
			left: dir + '%'
		}, 400, function() {
			// Clean up styling
			$(this)
				.toggleClass('off')
				.toggleClass('on')
				.attr('style','');
		});

		// Increment index
		if ( options.reverse ) {
			if ( index > 0 ) {
				index--;
			} else {
				index = $('.project').length - 1;
			}
		} else if ( options.i !== undefined ) {
			index = options.i;
		} else {
			if ( index < $('.project').length - 1 ) {
				index++;
			} else {
				index = 0;
			}
		}
		$('.projects li').eq(index).addClass('selected');
		$('.project').eq(index).css('left', -dir + '%').animate({
			left: '0%'
		}, 400, function() {
			// Clean up styling
			$(this)
				.toggleClass('off')
				.attr('style','');
		});
	}
			
});


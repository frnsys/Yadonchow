	$(function() {

			$('nav ul').show();
			$('.display').show();
			$('.section h2').hide();


			// Shows a section and hides others
			$.loadSection = function( section ) {

				$('.section').hide().removeClass('active-section');
				$('nav ul li a').removeClass('selected');

				if ( section == '' || !$('.' + section).size() ) {
					$('.section:first').show().addClass('active-section');
					$('nav ul li a:first').addClass('selected');
				} else {
					$('.' + section).show().addClass('active-section');
					$('nav ul li a[href=#' + section + ']').addClass('selected');				
				}

			}

			$.loadSection( window.location.hash.substring(1) );

			$('nav ul li a').live( 'click', function() {
				$.loadSection( $(this).attr('href').substr(1) );
			});

			// To ensure the nav doesn't disappear after resizing:
			$(window).resize( function() {
					$('nav ul').show();
					$('.display').show();					
			});



			/* Display scripts
			 *
			 * These functions manage the image carousel
			 */

				// Initialize next/prev arrow fading on hover
				$.initArrowFade = function() {

					// set up hover reveal for buttons
						$('.display').hover(
							function() {
								$(this).find('.next, .prev').fadeIn('fast');
							},
							function() {
								$(this).find('.next, .prev').fadeOut('fast');
							}
						);

				}

				// Stop animations
				$.stopAnimations = function( section_i, i, all ) {
					$('.display img').each(function() {
						if ( $(this).index() == i[section_i] ) {
							if ( all == true ) { $(this).stop( true, true ); }
						}
						else { $(this).stop( true, true ); }
					});
				}

				// Initialize slider
				$.initSlider = function() {

					var sizes = []; // total number of images in each section
					var i = []; // index variable
					var select_i = ''; // selector index variable

					// Section preparation
					$('.section').each( function() {

							var section = $(this);	

							$(this).attr( 'data-index', $(this).index() - 1);
							var sectionSize = section.find('.display img[class!=dummy]').size();

							i.push(0);
							sizes.push( sectionSize );

							console.log(sizes);

							section.find('.display').append(
								'<img class="dummy" src="/img/portfolio/shots/dummy.png" />\n'
							);

							if ( sectionSize > 1 ) {
								section.find('.display').append(
									'<div class="controls">\n' +
									'<h3></h3>\n' +
									'<div class="selector"></div>\n' +
									'<div class="next">&raquo;</div>\n' +
									'<div class="prev">&laquo;</div>\n' +
									'</div>\n'
								);
							}


							// Show first images for each section
							var firstImage = section.find('.display img[class!=dummy]').eq(0);
							firstImage.show();
							section.find('.display h3').html( firstImage.attr('alt') );
								
							// Spawn selector circles							
							section.find('.display img[class!=dummy]').each( function() {
								section.find('.selector').append( '<a href="#"></a>' );
								section.find('.selector a').eq(0).addClass('active');
							});

					});

					// next/past buttons
					$('.next, .prev').click( function() {

						var thisSection = $(this).closest('.section');
						var section_i = thisSection.attr('data-index');

						$.stopAnimations( section_i, i, false );

						var pastImage = thisSection.find('.display img').eq( i[section_i] );						
						// if a selector index is set, use that for i
						if ( select_i != '' ) {
							i[section_i] = select_i;
						}

						if ( $(this).attr('class') == 'next' ) {
							if ( i[section_i] + 1 > sizes[section_i] - 1 ) { i[section_i] = 0; }
							else { i[section_i]++; }
						}
						else if ( $(this).attr('class') == 'prev' ) {
							if ( i[section_i] - 1 < 0 ) { i[section_i] = sizes[section_i] - 1; }
							else { i[section_i]--; }
						}

						// update selectors
						thisSection.find('.selector a.active').removeClass('active');
						thisSection.find('.selector a').eq( i[section_i] ).addClass('active');

						// crossfade images & captions
						pastImage.fadeOut();

						var newImage = thisSection.find('.display img').eq( i[section_i] );
						thisSection.find('.display h3').html( newImage.attr('alt') );
						newImage.fadeIn(500, function() {
						});


					});

					// selector buttons
					$('.selector a').live('click',function() {

						var thisSection = $(this).closest('.section');
						var section_i = thisSection.attr('data-index');

						$.stopAnimations( section_i, i, true );
						
						select_i = $(this).index() - 1;

						if ( select_i + 1 < 0 ) { select_i = sizes[section_i] - 1 }
						$('.next').click();

						// reset selector index
						select_i = '';
						return false;
					});

				}


				$.initSlider();
				
				// only initialize arrow fades if window is large enough
				if ( $(window).width() > 800 ) {
					$.initArrowFade();
				} else {
					$('.next, .prev').show();	
				}

				// responsive:
				// handle window resizing
				$(window).resize(function() {
					if ( $(window).width() < 800 ) {
						// stop the arrow slider buttons from fading
						$('.next, .prev').show();
						$('.display').unbind('hover');
					} else {
						$.initArrowFade();
					}
				});



				// only show selectors/arrows if more than 1 images
				// add image header texts

				$.sliderLoop = setInterval(function() {
					if ( $('.active-section .display img[class!=dummy]').size() > 1 ) {
						$('.active-section .next').click();
					}
				}, 5000);

				
	});


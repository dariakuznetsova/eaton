
//Выбор опций в aside
$(document).ready(function() {
	var $filterLink = $('.j-filter-link');

	$filterLink.on('click', function() {
		var $this = $(this);

		if(!$this.hasClass('active-filter-link')) {
			$this.addClass('active-filter-link').append('<a href="javascript:;" class="close-link j-close-link"><img src="images/cancel.svg" alt=""></a>');
			
			$('.j-close-link').on('click', function(e) {
				var $this = $(this);
				$this.parent().removeClass('active-filter-link');
				$this.remove();
				e.stopPropagation();
			})
		}
	})
})


//grid manufacturer
$('.grid').masonry({
  itemSelector: '.grid-item'
});


//expand paragraph
$(document).ready(function() {
	$('.j-more-text-link').on('click', function() {
		$('.j-text-info').toggleClass('info-paragraph');
		$('.fade-effect').fadeToggle(100);
		$(this).toggleClass('rotate');
	})
});


//Animating anchor links
$(document).ready(function(){
    $(".j-up-link").on("click", function (e) {
        e.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top - 100 + 'px'}, 700);
    });
});


//switching tables on compare page
$(document).ready(function(){
	var $table = $('.j-main-table');
	var $li = $('.compare__view-menu').find('li');

	$('.j-summary-link').on('click', function() {
		$li.removeClass('active');
		$(this).parent('li').addClass('active');
		$table.eq(0).hide();
		$table.last().show();
	})

	$('.j-detailed-link').on('click', function() {
		$li.removeClass('active');
		$(this).parent('li').addClass('active');
		$table.last().hide();
		$table.eq(0).show();
	})
})



//remove meters (compare page)
$(document).ready(function(){
	var $link = $('.j-delete-link');

	$link.on('click', function() {
		var $itemSummary = $('.j-summary-table').find('.j-first-tr').find('td');
		var $itemSummaryLength = $itemSummary.length;
		var $itemDetailed = $('.j-table-detail').find('.j-first-tr').find('td');
		var $itemDetailedLength = $itemDetailed.length;
		var $thisParent = $(this).parent('.buy-block').parent('td');
		var $thisParentIndex = $thisParent.index();
		var $tdAdv = $('.j-advantages').find('td');
		var $tdDisadv = $('.j-disadvantages').find('td');
		var $trSummary = $('.j-summary-table').find('tr');

		var myFunc = function() {
			$('.j-first-tr').find('td').eq($thisParentIndex).remove();
			$tdAdv.eq($thisParentIndex).remove();
			$tdDisadv.eq($thisParentIndex).remove();
		}

		var openNewPage = function() {
			$('.j-compare-table').fadeOut(100);
			window.location = "choose.html";
		}

		if($itemDetailedLength > 3 && $itemSummaryLength > 3) {
			$trSummary.each(function(index) {
				var $td = $(this).find('td');
				$td.eq($thisParentIndex).remove();
			})
			myFunc();
		} else if ($itemDetailedLength <= 3 && $itemSummaryLength <= 3)
			openNewPage();
		
	})

})



//clean filters (compare page)
$(document).ready(function(){
	var $resetButton = $('.reset-button'),
        $checkbox = $('.meter-choose-form').find('.checked__elem');

    $resetButton.on('click', function(e) {
        e.preventDefault();
        $checkbox.removeAttr('checked disabled');
        $('.j-chosen-meter').removeClass('chosen');
        $('.label-tooltip').remove();
        counter = 0;
    });

});


//choosing no more then 4 options (choose page)
$(document).ready(function(){
	var $checkboxInput = $('.j-meter-choose-form').find('.j-checkbox-input');
	counter = 0;
	
	$checkboxInput.on('click', function() {
		var $this = $(this);

		if ($this.is(":checked")) {
			$this.closest('fieldset').addClass('active');

			var tooltipFunc = function() {
				if($(window).width() >= 1200 || $(window).width() < 480) {
					$this.parent('label').append('<div class="label-tooltip"><a href="compare.html">View results</a></div>').fadeIn(500);
				$this.siblings('.label-tooltip').fadeIn(300).delay(5000).fadeOut(200);
				}
			}

			if (counter < 3) {
				$this.next('.j-fakebox').addClass('checkbox-checked');
				$('.j-chosen-meter').eq(counter).addClass('chosen');
				// tooltipFunc();
				counter++;
			} else if (counter = 3) {
				$this.next('.j-fakebox').addClass('checkbox-checked');
				$('.j-chosen-meter').eq(counter).addClass('chosen');
				// tooltipFunc();
				$checkboxInput.filter(":not(':checked')").prop('disabled',true);
				counter++;
			}

		} else if (!$this.is(":checked")) {
			$this.closest('fieldset').removeClass('active');
			$this.next('.j-fakebox').removeClass('checkbox-checked');
			// $this.siblings('.label-tooltip').remove();
			$checkboxInput.prop('disabled',false);
			counter--;
			$('.j-chosen-meter').eq(counter).removeClass('chosen');
		}

	});

});



//Select
$(document).ready(function() {
    $(".select").selectOrDie();
});

$(document).ready(function() {
	$(".select").selectOrDie('disable');

    $('.j-select-input').on('click', function() {
        var $this = $(this);

        if ($this.is(":checked")) {
			$this.parent('label').parent('fieldset').find(".select").selectOrDie('enable');
        } else if (!$this.is(":checked")) {
        	$this.parent('label').parent('fieldset').find(".select").selectOrDie('disable');
        }
        
    });
});


$(document).ready(function(){
	//here's an array of american states in select (products page)
	var data = [{ id: 0, text: 'Pennsylvania' }, { id: 1, text: 'Alabama' }, { id: 2, text: 'Oregon' }, 
	{ id: 3, text: 'Ohio' }, { id: 4, text: 'South Carolina' }, { id: 5, text: 'Tehas' }, { id: 6, text: 'California' },
	{ id: 7, text: 'Alaska' }, { id: 8, text: 'Filadelphia' }, { id: 9, text: 'Illinois' }];


	$(".select__states").select2({
		data:data,
		placeholder: "Select a state"
	});

})

$(document).ready(function(){
	$(".products__select1").select2({
		placeholder: "Select utilities"
	});
})

$(document).ready(function(){
	$(".products__select2").select2({
		placeholder: "ALL"
	});
})


//filter open-close in mobile version (<480)
$(document).ready(function(){

	$(".j-filter-mobile-link").on('click', function() {
		$(this).toggleClass('toggle-class');
		$('.j-aside-products').slideToggle(200);
		$('.j-aside-products').toggleClass('show-hide');
		$('.j-main-products').slideToggle(0);
		$('.footer').slideToggle(0);
	})

	$(".j-filter-mobile-link2").on('click', function() {
		$(this).toggleClass('toggle-class');
		$('.j-aside-products').slideToggle(200);
	})
})



$(document).ready(function(){
	var $productsList = $('.j-main-products');
	var $link = $('.j-item-states-link');

	$link.on('click', function() {
		var $this = $(this);
		var $thisIndex = $this.index();

		$link.not($this).removeClass('active-icon');
		$this.addClass('active-icon');

		if ($thisIndex == 0) {
			$productsList.removeClass('block-view');
		} else if ($thisIndex == 1) {
			$productsList.addClass('block-view');
		}
	})

})


//blue line on hover in index page
$(document).ready(function() {
	var $blueLine = $('.blue-line');
	var $li = $('.j-home-item');
	var liWidth = $li.width();
	
	$li.mouseenter(function () {
		var $this = $(this);
		var thisOffsetLeft = $this.offset().left;

		$blueLine.css('width','0');

		$(this).find($blueLine).css({'left': thisOffsetLeft + 'px','width': liWidth + 'px'})
			.addClass('scaleWide');
	}).mouseleave(function () {
		var $this = $(this);
		$blueLine.css('width','0');
	});

});



//green button how-to-buy
$(document).ready(function() {
	var $greenButton = $('.j-green-button');
	var $mapAside = $('.j-map-aside');
	var $window = $(window);
	var windowHeight = $window.height();
	var documentHeight = $(document).height();
	
	$window.on('scroll', function() {
		var scrollTop = $(window).scrollTop();

		if (scrollTop + windowHeight >= documentHeight - windowHeight) {
			$greenButton.addClass('invisible-link');
		} else {
			$greenButton.removeClass('invisible-link');
		}
	})

})


//how-to-buy - fixed block
$(document).ready(function() {
	var $upperBlock = $('.j-upperSearch-block');
	var $window = $(window);

	var scrollFunc = function() {
		$window.on('scroll', function() {
			var scrollTop = $(window).scrollTop();

			if (scrollTop > 0) {
				$upperBlock.addClass('fixed');
			} else {
				$upperBlock.removeClass('fixed');
			}
		})
	}

	scrollFunc();

})



//main
$(document).ready(function() {
	var $homeWrapper = $('.j-home-wrapper');
	var $titleMain = $homeWrapper.find('.title_main');
	var $h1 = $homeWrapper.find('.h1-color');
	var $subtitle = $homeWrapper.find('.subtitle_main')

	if($(window).width() >= '1024') {

		$(window).scroll(function (e) {
             var scrolled = $(window).scrollTop();
             var startColor = 0x333333;

			$homeWrapper.css({
				'-webkit-transform' : 'translateY(' + scrolled*1.5 + 'px)',
				'transform'         : 'translateY(' + scrolled*1.5 + 'px)'
			});

			if ($(window).scrollTop() > 0) {
				$titleMain.addClass('colored');
				$h1.addClass('colored');
				$subtitle.addClass('colored');
			} else {
				$titleMain.removeClass('colored');
				$h1.removeClass('colored');
				$subtitle.removeClass('colored');
			}

        });
	}

});



//gallery
$(document).ready(function(){

    $('.j-meters-gallery').slick({
        arrows:false,
        infinite: true,
        slidesToShow:   5,
        autoplay: true,
        autoplaySpeed: 1000,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1370,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });
})


//up-link animating
$(document).ready(function(){

	$(".j-up-link").on("click", function (e) {
        var id  = $(this).attr('href'),
            top = $(id).offset().top;

        e.preventDefault();
        $('body,html').animate({scrollTop: top + 'px'}, 100);
    });

})



//burger link - meter_detailed page
$(document).ready(function() {

	$('.j-burger-link').on('click', function() {
		$('.j-meters-menu').toggleClass('visible');
		$(this).find('.hamburger').toggleClass('is-active');
		$('.j-green-button').toggleClass('invisible');
	})

})


//contact form - appending text element when focus on input/textarea
$(document).ready(function() {

	var inputFocusFunc = function () {

		var $input = $('.j-input');
		var placeholder = $input.attr('placeholder');

		$input.on('focus', function() {
			var $this = $(this);
			var placeholder = $this.attr('placeholder');

			$this.parent().append('<div class="position-elem">' + placeholder + '</div>');
		})

		$input.on('blur', function() {
			$('.position-elem').remove();
		})
	}

	if($(window).width > '480') {
		inputFocusFunc();
	}

})



//how-to-buy - naking page content half invisible when focus on city change input
$(document).ready(function() {

	var $cityInput = $('.j-city-input');
	var $bg = $('.j-light-bg');

	$cityInput.on('focus', function() {
		$bg.addClass('visible');
	})

	$cityInput.on('blur', function() {
		$bg.removeClass('visible');
	})

})


//
$(document).ready(function() {
	var $listLink = $('.j-list-view');
	var $mapLink = $('.j-map-view');
	var $contactAside = $('.j-contact-aside');

	$listLink.on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
		$contactAside.addClass('list-view');
	})

	$mapLink.on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
		$contactAside.removeClass('list-view');
	})

})


//tabs documentation on meter-detailed page
$(document).ready(function() {
	var $infoBlock = $('.j-block-info');
	var $docBlock = $('.j-block-doc');

	$('.j-documentation-link').on('click', function() {
		var $this = $(this);

		$this.toggleClass('blue');

		if($this.hasClass('blue')) {
			$infoBlock.hide();
			$docBlock.show();
		} else {
			$docBlock.hide();
			$infoBlock.show();
		}
	})
})


$(document).ready(function() {
	if(window.location.hash == "#docs") {
		$('.j-documentation-link').addClass('blue');
		$('.j-block-info').hide();
		$('.j-block-doc').show();
	}
})



$(document).ready(function() {

	$('.j-doc-specification-link').on('click', function() {
		$(this).toggleClass('list-hide');
	})

})

// $('#scroll').perfectScroll();

// $(document).ready(function() {
// 	$('.aside__scroll').perfectScrollbar();
// })


// window.onload = function() {
// 	$('.aside__scroll').perfectScrollbar();
// }



//meter index page
$(document).ready(function(){
	var $categoryItem = $('.j-category-item');
	var $categoryImg = $('.j-category-img');
	var $categoryTitle = $('.j-category-text');


	if($(window).width() >= '1200') {

		$(window).scroll(function (e) {
	   //       var scrollTop = $(window).scrollTop();
			 // var categoryTitleOffset = $categoryTitle.offset().top;
	   //       var elemOfftop = $('.j-categoty-photo').offset().top;
	   //       var elemOffBottom =  elemOfftop +  $('.j-categoty-photo').height();
	   //       var difference = scrollTop - categoryTitleOffset;

	   //       console.log(scrollTop, categoryTitleOffset);

	   //       if(scrollTop >= elemOfftop*0.8 && scrollTop <= elemOffBottom/1.3) {
	   //       	console.log('1');
	   //       	$categoryTitle.css({
				// 	'-webkit-transform' : 'translateY(' + difference*1.2 + 'px)',
				// 	'transform'         : 'translateY(' + difference*1.2 + 'px)'
				// });
				// var categoryTitleOffset = $categoryTitle.offset().top;

	   //       } else {
    //      		console.log('2');
	   //       }

			

			// if ($(window).scrollTop() > 0) {
			// 	$titleMain.addClass('colored');
			// 	$h1.addClass('colored');
			// 	$subtitle.addClass('colored');
			// } else {
			// 	$titleMain.removeClass('colored');
			// 	$h1.removeClass('colored');
			// 	$subtitle.removeClass('colored');
			// }

	    });
	}


    // if($(window).width() >= '1024') {
    //     $categoryItem.mousemove(function (e) {
    //          var x = (e.pageX) / 100;
    //          var y = -(e.pageY) / 100;
    //         $(this).find($categoryImg).css({'top': x + 'px','left': y + 'px'});
    //     });
    // };
})



//google map
var map;

var initMap = function () {

	var myLatlng = new google.maps.LatLng(40.439245, -79.998228);
    var pos1 = new google.maps.LatLng(40.430208, -80.014105);
    var pos2 = new google.maps.LatLng(40.442777, -79.986232);
    var pos3 = new google.maps.LatLng(40.442592, -80.004197);
    var pos4 = new google.maps.LatLng(40.427255, -79.987446);
    var pos5 = new google.maps.LatLng(40.450998, -80.017063);
    var pos6 = new google.maps.LatLng(41.866387, -79.152743);
    var pos7 = new google.maps.LatLng(40.419687, -80.008527);
    var mapOptions = {
        zoom: 10,
        center: myLatlng
    }

	map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 40.440898, lng: -79.998413},
            zoom: 13,
            scrollwheel: false,
            mapTypeControl: false,
        	styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#959494"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
     });

    var image = 'images/location4.png';  

    var marker = new google.maps.Marker({
        position: pos1,
        map: map,
        icon: image,
        title: '434 Grace Street, Pittsburgh, PA'
    });

    var marker = new google.maps.Marker({
        position: pos2,
        map: map,
        icon: image,
        title: '1000 Cherrington Court, Coraopolis, PA'
    });

    var marker = new google.maps.Marker({
        position: pos3,
        map: map,
        icon: image,
        title: '1000 Cherrington Court, Coraopolis, PA'
    });

    var marker = new google.maps.Marker({
        position: pos4,
        map: map,
        icon: image,
        title: '1000 Cherrington Court, Coraopolis, PA'
    });

    var marker = new google.maps.Marker({
        position: pos5,
        map: map,
        icon: image,
        title: '1000 Cherrington Court, Coraopolis, PA'
    });

	var marker = new google.maps.Marker({
        position: pos6,
        map: map,
        icon: image,
        title: '1000 Cherrington Court, Coraopolis, PA'
    });

    var marker = new google.maps.Marker({
        position: pos7,
        map: map,
        icon: image,
        title: '1000 Cherrington Court, Coraopolis, PA'
    });

}

if($('#map').length != 0) {
	window.load = initMap();
}



//////////////////
var map2;

var initMap2 = function () {

	var myLatlng = new google.maps.LatLng(40.439245, -79.998228);
    var pos1 = new google.maps.LatLng(40.430208, -80.014105);
    var pos2 = new google.maps.LatLng(40.442777, -79.986232);
    var pos3 = new google.maps.LatLng(40.442592, -80.004197);
    var pos4 = new google.maps.LatLng(40.427255, -79.987446);
    var pos5 = new google.maps.LatLng(40.450998, -80.017063);
    var pos6 = new google.maps.LatLng(41.866387, -79.152743);
    var pos7 = new google.maps.LatLng(40.419687, -80.008527);
    var mapOptions = {
        zoom: 10,
        center: myLatlng
    }

	map2 = new google.maps.Map(document.getElementById('map2'), {
            center: {lat: 40.440898, lng: -79.998413},
            zoom: 13,
            scrollwheel: false,
            mapTypeControl: false,
        	styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#959494"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
     });

    var image = 'images/location5.png';  

    var marker = new google.maps.Marker({
        position: pos1,
        map: map2,
        icon: image,
        title: '434 Grace Street, Pittsburgh, PA'
    });

    var marker = new google.maps.Marker({
        position: pos2,
        map: map2,
        icon: image,
        title: '1000 Cherrington Court, Coraopolis, PA'
    });

    var marker = new google.maps.Marker({
        position: pos3,
        map: map2,
        icon: image,
        title: '1000 Cherrington Court, Coraopolis, PA'
    });

    var marker = new google.maps.Marker({
        position: pos4,
        map: map2,
        icon: image,
        title: '1000 Cherrington Court, Coraopolis, PA'
    });

    var marker = new google.maps.Marker({
        position: pos5,
        map: map2,
        icon: image,
        title: '1000 Cherrington Court, Coraopolis, PA'
    });

	var marker = new google.maps.Marker({
        position: pos6,
        map: map2,
        icon: image,
        title: '1000 Cherrington Court, Coraopolis, PA'
    });

    var marker = new google.maps.Marker({
        position: pos7,
        map: map2,
        icon: image,
        title: '1000 Cherrington Court, Coraopolis, PA'
    });

}

if($('#map2').length != 0) {
	window.load = initMap();
}
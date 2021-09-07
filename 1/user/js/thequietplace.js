function thequietplace() {

	$('.position-fixed-btn-frame').hide();

	if (window.globalFrame) {
		$('.position-fixed-btn-frame').show();
	}
	
	$('.header-icon-sound').removeClass('hide muted');
	$('.thequietplace-next').removeClass('disabled');
	$('.panel').removeClass('used current');
	$('.panel').eq(0).addClass('current');


	// window.audio = new Audio('user/audio/Meydän_Tired_of_life.mp3');
	// window.audio.play();

	var $header = $('#home-header'),
		$message = $header.find('.message'),
		messages = $message.length - 1,
		message = Math.floor(Math.random() * messages),
		$container = $('.thequietplace-wapp'),
		block = $("body").attr('id') == 'thoughts' ? true : false,
		interval;

	function pause_music() {
		window.audio.pause();
	}

	$("body").on('keydown', function (event) {
		if (event.type == 'keydown' && event.which == 32) {
			$(".thequietplace-wapp:visible").trigger('moveon');
		};
	});

	
	$("body").on('tap', ".thequietplace-wapp:visible", function (event) {
		$(".thequietplace-wapp:visible").trigger('moveon');
	});

	$("body").on("click touch", ".thequietplace-prev:visible", function () {
		removeEventListeners();
		$('.header-icon-menu').removeClass('disabled');
		$('.header-icon-sound').addClass('hide');
		// window.audio.pause();
		$('#OBJ_13 div').click();
	});

	$("body").on("click touch", ".thequietplace-next:visible", function (event) {
		$(".thequietplace-wapp:visible").trigger('moveon');
	});

	$("body").on('moveon', function (event) {
		if (block) {
			return false
		};

		var $panel = $panel = $('#thequietplace').find('.panel:visible'),
			$current = $container.find('.current:visible'),
			next = $current.index() - 1;
		$next = $panel.eq(next);

		if(next == 28) {
			$('.header-icon-menu').addClass('glowing');
		} else {
			$('.header-icon-menu').removeClass('glowing');
		}

		if ($current.data('name') == '90seconds') {
			$("body").off('keydown touchstart');

			setInterval(function (event) {
				$('.thequietplace-next:visible').click();
			}, 90000);

		} else if ($current.data('name') == 'relax-start') {
			$('.thequietplace-next').addClass('disabled');
			block = true;
			$current.data('name', '');
			$current.html( '&nbsp;<span class="time">29<\/span>&nbsp;');
			interval = setInterval(function () {
				$current.find('.time').each(function () {
					var text = $(this).text();
					if (text > 0) {
						$(this).text($(this).text() - 1);
					};
				});
			}, 1200);
			setTimeout(function (event) {
				block = false;
				$("body").trigger('moveon');
				$('.thequietplace-next').removeClass('disabled');
				clearInterval(interval);
				// $current.data('name', 'relax');
				$current.data('name', 'relax-start');
			}, 34800);
			return false;
		} else if ($current.data('name') == 'final') {
			// pause_music();
			$("body").off('tap', ".thequietplace-wapp:visible");
			$("body").off('click', ".thequietplace-next:visible");
			$("body").off('keydown', ".thequietplace-wapp:visible");
			removeEventListeners();
			$('#next img').click();
			return false;
		}
		$current.removeClass('current').addClass('used');
		$next.addClass('current');
	});

	function removeEventListeners() {
		// $(".panel[data-name=relax-start]").text(30);
		$("body").off('keydown');
		$("body").off('tap', ".thequietplace-wapp:visible");
		$("body").off("click touch", ".thequietplace-prev:visible");
		$("body").off("click touch", ".thequietplace-next:visible");
		$("body").off('moveon');
	}

	(function change_message() {
		var time = 500;
		message++;
		if (message > messages) {
			message = 0
		};
		$message.eq(message - 1).animate({
			opacity: 0
		}, time);
		$message.eq(message).animate({
			opacity: 1
		}, time);
		setTimeout(change_message, 7000);
	})();
};
// const { on } = require("gulp");


//слайдер (карусель)
const slider = tns({
	container: '.carousel__inner',
	items: 1,
	speed: 1200,
	slideBy: 'page',
	swipeAngle: false,
	autoplay: false,
	controls: false,
	nav: false,
	mouseDrag: true,
	responsive: {
		991: {
			touch: true,
		}
	}
});


//стрелки на слайдере
document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
});

//переключает табы
$(document).ready(function () {
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});



	//в карточке торара переворачивает "подробнее"
	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	//модальное всплывающие окна
	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});

	//крестик "назад"
	$('.modal__close').on('click', function () {
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});

	//кнопка в карточке
	$('.button_mini').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	//настройка валидации форм
	function validateForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста введите Имя",
					minlength: jQuery.validator.format("Введите {0} символа")
				},
				phone: "Пожалуйста введите номер телефона",
				email: {
					required: "Пожалуйста введите почту",
					email: "Неправильно введет адрес почты",
				}
			}
		});
	};
	validateForms('#consultation-form');
	validateForms('#consultation form');
	validateForms('#order form');

	//маска для input номера телефона
	$('input[name=phone]').mask("+7 (999) 999-99-99");

	//настройка отправки на почту с формы
	$('form').submit(function (e) {
		e.preventDefault();

		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

	//стрелка появляется при скроле на 1000px
	$(window).scroll(function () {
		if ($(this).scrollTop() > 1000) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	//плавный скрол от стрелки
	$("a").on('click', function (event) {

		// Make sure this.hash has a value before overriding default behavior
		if (this.hash !== "") {
			// Prevent default anchor click behavior
			event.preventDefault();

			// Store hash
			const hash = this.hash;

			// Using jQuery's animate() method to add smooth page scroll
			// The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 100, function () {

				// Add hash (#) to URL when done scrolling (default click behavior)
				window.location.hash = hash;
			});
		} // End if
	});


	//подключение анимации, задержка, при скроле
	new WOW().init();

});

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

document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
});

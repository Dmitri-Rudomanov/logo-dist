
var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
if (isMobile.any()) { }

// BurgerMenu
  $('.icon-menu').click(function(){
        $('.icon-menu, .menu__body').toggleClass('active');
	$('body').toggleClass('lock');
  });

let menuPageBurger = document.querySelector('.menu-page__burger');
let menuPageBody = document.querySelector('.menu-page__body');
menuPageBurger.addEventListener("click", function (e) {
	menuPageBurger.classList.toggle('active');
	_slideToggle(menuPageBody);
});

//Вывод под-меню on mobile/pc
if (isMobile.any()) {
	let menuParents = document.querySelectorAll('.menu-page__parent>a');
	for (let index = 0; index < menuParents.length; index++) {
		const menuParent = menuParents[index];
		menuParent.addEventListener("click", function (e) {
			menuParent.parentElement.classList.toggle('active');
			e.preventDefault();
		});
	}
} else {
	let menuParents = document.querySelectorAll('.menu-page__parent');
	for (let index = 0; index < menuParents.length; index++) {
		const menuParent = menuParents[index];
		menuParent.addEventListener("mouseenter", function (e) {
			menuParent.classList.add('active');
		});
		menuParent.addEventListener("mouseleave", function (e) {
			menuParent.classList.remove('active');
		});
	}
}
//вывод категорий поиска
let searchSelect = document.querySelector('.search-page__title');
let categoriesSearch = document.querySelector('.categories-search');
searchSelect.addEventListener("click", function (e) {
	searchSelect.classList.toggle('active');
	_slideToggle(categoriesSearch);
});

//Обращаемся к чекбоксам

let checkboxCategories = document.querySelectorAll('.categories-search__checkbox');

for (let index = 0; index < checkboxCategories.length; index++) {
	const checkboxCategory = checkboxCategories[index];
	checkboxCategory.addEventListener("change", function (e) {
		checkboxCategory.classList.toggle('active');

		let checkboxActiveCategories = document.querySelectorAll('.categories-search__checkbox.active');

		if (checkboxActiveCategories.length > 0) {
			searchSelect.classList.add('_categories');
			let searchQuantity = searchSelect.querySelector('.search-page__quantity');
			searchQuantity.innerHTML = searchQuantity.getAttribute('data-text') + ' ' + checkboxActiveCategories.length;
		} else {
			searchSelect.classList.remove('_categories');
		}
	});
}

//Swiper
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			if (slider.classList.contains('_swiper_scroll')) {
				let sliderScroll = document.createElement('div');
				sliderScroll.classList.add('swiper-scrollbar');
				slider.appendChild(sliderScroll);
			}
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}
function sliders_bild_callback(params) { }

let sliderScrollItems = document.querySelectorAll('._swiper_scroll');
if (sliderScrollItems.length > 0) {
	for (let index = 0; index < sliderScrollItems.length; index++) {
		const sliderScrollItem = sliderScrollItems[index];
		const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
		const sliderScroll = new Swiper(sliderScrollItem, {
			observer: true,
			observeParents: true,
			direction: 'vertical',
			slidesPerView: 'auto',
			freeMode: true,
			scrollbar: {
				el: sliderScrollBar,
				draggable: true,
				snapOnRelease: false
			},
			mousewheel: {
				releaseOnEdges: true,
			},
		});
		sliderScroll.scrollbar.updateSize();
	}
}
if (document.querySelector('.mainslider__body')) {
	new Swiper('.mainslider__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 800,
		//loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts
		pagination: {
			el: '.mainslider__dotts',
			clickable: true,
		},
		// Arrows
		/*
		navigation: {
			nextEl: '.about__more .more__item_next',
			prevEl: '.about__more .more__item_prev',
		},
		*/
		/*
		breakpoints: {
			320: {
				slidesPerView: 1,
				spaceBetween: 0,
				autoHeight: true,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1268: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
		},
		*/
		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
		// And if we need scrollbar
		//scrollbar: {
		//	el: '.swiper-scrollbar',
		//},
	});
	let mainsliderImages = document.querySelectorAll('.mainslider__image');
	let mainsliderDotts = document.querySelectorAll('.mainslider__dotts .swiper-pagination-bullet');

	for (let index = 0; index < mainsliderImages.length; index++) {
		const mainsliderImage = mainsliderImages[index].querySelector('img').getAttribute('src');
		mainsliderDotts[index].style.backgroundImage = "url('" + mainsliderImage + "')";
	}
}
if (document.querySelector('.products-slider')) {
	let productsSlider = new Swiper('.products-slider__item', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		autoHeight: true,
		speed: 800,
		//loop: true,
		//preloadImages: false,
		//lazy: true,
		// Dotts

		pagination: {
			el: '.products-slider__info',
			type: 'fraction'
		},
		// Arrows
		navigation: {
			nextEl: '.products-slider__arrow_next',
			prevEl: '.products-slider__arrow_prev',
		},
		on: {
			lazyImageReady: function () {
				ibg();
			},
		}
	});
}
if (document.querySelector('.brands-slider')) {
	let brandsSlider = new Swiper('.brands-slider__body', {
		observer: true,
		observeParents: true,
		slidesPerView: 5,
		spaceBetween: 0,
		//autoHeight: true,
		speed: 800,
		loop: true,
		//preloadImages: false,
		//lazy: true,
		// Arrows
		navigation: {
			nextEl: '.brands-slider__arrow_next',
			prevEl: '.brands-slider__arrow_prev',
		},
		breakpoints: {
			320: {
				slidesPerView: 1,
				autoHeight: true,
			},
			480: {
				slidesPerView: 2,
			},
			600: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 4,
			},
			992: {
				slidesPerView: 5,
			},
		}
	});
}
if (document.querySelector('.images-product')) {
	let imagesSubSlider = new Swiper('.images-product__subslider', {
		observer: true,
		observeParents: true,
		slidesPerView: 4,
		spaceBetween: 0,
		//autoHeight: true,
		speed: 800,
		//loop: true,
		//preloadImages: false,
		//lazy: true,
	});
	let imagesMainSlider = new Swiper('.images-product__mainslider', {
		observer: true,
		observeParents: true,
		slidesPerView: 1,
		spaceBetween: 0,
		thumbs: {
			swiper: imagesSubSlider
		},
		//autoHeight: true,
		speed: 800,
		//loop: true,
		//preloadImages: false,
		//lazy: true,
	});

}


//Acive-filter
if (isMobile.any()) {
	const filterTitle = document.querySelector('.filter__title');
	if (filterTitle) {
		filterTitle.addEventListener("click", function (e) {
			filterTitle.classList.toggle('_active');
			_slideToggle(filterTitle.nextElementSibling);
		});
	}
}
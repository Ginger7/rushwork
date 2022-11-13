
function injectJS(url, async, integrity, crossorigin, callback){
	if(url !== "undefined"){
		var s = document.createElement('script');
		s.src = url;
		if(async) s.setAttribute('async', true);
		if(integrity) s.setAttribute('integrity', integrity);
		if(crossorigin) s.setAttribute('crossorigin', crossorigin);

		if (typeof callback == "function") {
				s.onload = function (e){
					if (e.type == 'load') setTimeout(callback, 0)
				}
		};

		document.head.appendChild(s);
	}
};


// Переменные для определения текущего размера экрана
var mqBreakPoints = {
	smartphoneMax: 479.98,
	screenXsMin: 480,
	screenXsMax: 575.98,
	screenSmMin: 576,
	screenSmMax: 767.98,
	screenMdMin: 768,
	screenMdMax: 991.98,
	screenLgMin: 992,
	screenLgMax: 1199.98,
	screenXlMin: 1200,
	screenXlMax: 1441.98,
	screenXXlMin: 1442,
	screenXXlMax: 1799.98,
	screenXXXlMin: 1800,
}
var mqMatches = {
	smartphoneMax: false,
	screenXsMin: false,
	screenXsMax: false,
	screenSmMin: false,
	screenSmMax: false,
	screenMdMin: false,
	screenMdMax: false,
	screenLgMin: false,
	screenLgMax: false,
	screenXlMin: false,
	screenXlMax: false,
	screenXXlMin: false
};

// Текущий Breakpoint храним в mqMatches
for (let bp in mqBreakPoints) {
	let minmax = (bp.indexOf('Max') !== -1) ? 'max' : 'min';
	enquire.register('('+minmax+'-width: '+mqBreakPoints[bp]+'px)', {
		match: function () { mqMatches[bp] = true },
		unmatch: function(){	mqMatches[bp] = false	}
	})
};

// Поддержка элемента picture
if( !Modernizr.picture ){
	injectJS("https://cdn.jsdelivr.net/picturefill/3.0.3/picturefill.min.js", true, 'sha256-iT+n/otuaeKCgxnASny7bxKeqCDbaV1M7VdX1ZRQtqg=', 'anonymous');
};
// Поддержка fetch
if( !Modernizr.fetch ){
	injectJS("https://cdn.jsdelivr.net/npm/whatwg-fetch@3.4/dist/fetch.umd.js", false, 'sha256-mgxDAbboBKeoCOtpaU7QhWdgWBGum+8dPxnIjiC97JI=', 'anonymous');
};
// Поддержка SVG некоторыми браузерами
injectJS("https://cdn.jsdelivr.net/npm/svg4everybody@2.1.9/dist/svg4everybody.min.js", true, 'sha256-kTezPOsOi5ZsWUKr7/D/EWcONq/hdrc0gPwk5/IUYy0=', 'anonymous');

// Поддержка objectfit
/* if (!Modernizr.objectfit) {
	injectJS("https://cdn.jsdelivr.net/npm/objectFitPolyfill@2.3/dist/objectFitPolyfill.basic.min.js", true, "sha256-Kms38lBvuW1aCtPabohpwj3Xx1VCuIjGgDS6X6ay3Hc=", "anonymous")
}; */
// Поддержка position: sticky
if (!Modernizr.csspositionsticky) {
	injectJS("https://cdn.jsdelivr.net/npm/stickyfilljs@2.1/dist/stickyfill.min.js");
}


$(function () {

	/* Подключаем полифил для SVG */
	var scriptWait = setInterval(function () {
		if (typeof window.svg4everybody === 'function') svg4everybody();
		clearInterval(scriptWait);
	}, 100);

	/* svg-иконки */
	if (document.body.hasAttribute('data-svg-icons-path')) {
		let path = document.body.getAttribute('data-svg-icons-path');

		$('.svg-icon').children('use').each(function () {
			this.setAttribute('xlink:href', path + this.getAttribute('xlink:href') )
		})
	}

});

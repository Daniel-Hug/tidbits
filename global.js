

// Array-like object to array:
function toArray(o) {
	for(var a=[], l=o.length; l--;) a[l]=o[l];
	return a;
}


// Get elements by CSS selector
function $$(s, el) {
	return toArray((el || document).querySelectorAll(s));
}
function $(s, el) {
	return (el || document).querySelector(s);
}


// Permalinks:
setTimeout(function() {
	var articleEls = $$('#articles > article');

	var numArticleEls = articleEls.length;
	var i = 1;

	while (numArticleEls--) {
		var id = "p" + i++;
		articleEls[numArticleEls].id = id;
		var permalink = document.createElement('a');
		permalink.className = "permalink";
		permalink.href = "#" + id;
		permalink.textContent = "#" + id;
		articleEls[numArticleEls].appendChild(permalink);
	}
}, 2000)

Date.prototype.startOf = function(unit) {
	var clone = new Date(this.getTime()), day;
	/* */if (unit === 'second') clone.setMilliseconds(0);
	else if (unit === 'minute') clone.setSeconds(0,0);
	else if (unit === 'hour'  ) clone.setMinutes(0,0,0);
	else {
		clone.setHours(0,0,0,0);
		if (unit === 'week') {
			day = clone.getDay();
			clone = day ? new Date(clone - 1000 * 60 * 60 * 24 * day) : clone;
		}
		else if (unit === 'month') clone.setDate(1);
		else if (unit === 'year' ) clone.setMonth(0,1);
	}
	return clone;
};

// Write to the document with script elements:
$$('script[type=echo]').forEach(function(el) {
	var expression = el.innerHTML;
	el.parentNode.replaceChild(document.createTextNode((expression + ';       ').slice(0, 30) + ' // ' + eval(expression)), el);
});


// select code snippets when clicked:
var codeEls = $$('code');
codeEls.forEach(function(codeEl) {
	codeEl.onclick = function() {
		var range;
		if (document.selection) {
			range = document.body.createTextRange();
			range.moveToElementText(this);
			range.select();
		}
		else if (window.getSelection) {
			range = document.createRange();
			range.selectNode(this);
			window.getSelection().addRange(range);
		}
	};
});




// Floating elements:
var backToTop = $('.back-to-top');

function floatEl() {
	backToTop.classList[document.body.scrollTop >= 800 ? 'add' : 'remove']('floating');
}

document.onload = document.onscroll = floatEl;




// Scroll to top of page:
function scrollToTop(el, dur) {
	if (dur <= 0) return;

	setTimeout(function() {
		el.scrollTop += el.scrollTop / dur * -10;
		scrollToTop(el, dur - 12);
	}, 10);
}

backToTop.addEventListener('click', function() {
	scrollToTop(document.body, 600);
}, false);




// Activate Demo iframe
var demoLinks = $$('a[target="demo-frame"]');
var demoBox   = $('#demo-box');

demoLinks.forEach(function(demoLink) {
	demoLink.onclick = function() {
		demoBox.classList.add('activeDemo');
	};
});

demoBox.onclick = function() {
	demoBox.classList.remove('activeDemo');
};
